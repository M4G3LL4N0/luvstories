-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables with proper constraints and comments
CREATE TABLE "public"."stories" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active' 
    CHECK (status IN ('active', 'archived', 'deleted')),
  "privacy_level" TEXT NOT NULL DEFAULT 'private'
    CHECK (privacy_level IN ('private', 'shared')),
  "is_encrypted" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE "public"."stories" IS 'Primary story workspaces for users';

-- Create other tables with similar structure
CREATE TABLE "public"."story_profiles" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "story_id" UUID NOT NULL REFERENCES "public"."stories"(id) ON DELETE CASCADE,
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "subject_name" TEXT,
  "relationship_type" TEXT,
  "summary" TEXT,
  "is_encrypted" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON "public"."stories"(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_updated_at ON "public"."stories"(updated_at);

-- Enable RLS and create policies for all tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
      'stories', 'story_profiles', 'story_events',
      'story_notes', 'story_scores', 'story_reports'
    )
  LOOP
    BEGIN
      -- Double check table exists before attempting operations
      IF EXISTS (SELECT 1 FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = tbl) THEN
        
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
        
        -- Skip if policy already exists
        IF NOT EXISTS (SELECT 1 FROM pg_policies 
                      WHERE schemaname = 'public' 
                      AND tablename = tbl 
                      AND policyname = 'Users can only access their own rows') THEN
          EXECUTE format('CREATE POLICY "Users can only access their own rows" 
            ON %I FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)', tbl);
        END IF;
        
        RAISE NOTICE 'Ensured RLS and policy for table: %', tbl;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to modify table %: %', tbl, SQLERRM;
    END;
  END LOOP;
END
$$;

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
      'stories', 'story_profiles', 'story_events',
      'story_notes', 'story_scores', 'story_reports'
    )
  LOOP
    BEGIN
      -- Double check table exists before attempting operations
      IF EXISTS (SELECT 1 FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = tbl) THEN
        
        -- Only drop existing trigger if it exists
        IF EXISTS (SELECT 1 FROM pg_trigger 
                  WHERE tgname = format('update_%I_timestamp', tbl) 
                  AND tgrelid = format('public.%I', tbl)::regclass) THEN
          EXECUTE format('DROP TRIGGER update_%I_timestamp ON %I', tbl, tbl);
        END IF;
        
        -- Create new trigger
        EXECUTE format('CREATE TRIGGER update_%I_timestamp
          BEFORE UPDATE ON %I
          FOR EACH ROW EXECUTE FUNCTION update_timestamp()', tbl, tbl);
          
        RAISE NOTICE 'Ensured timestamp trigger for table: %', tbl;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to modify triggers for table %: %', tbl, SQLERRM;
    END;
  END LOOP;
END
$$;
