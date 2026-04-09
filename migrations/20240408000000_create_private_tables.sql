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
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
      
      EXECUTE format('CREATE POLICY "Users can only access their own rows" 
        ON %I FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)', tbl);
      
      RAISE NOTICE 'Enabled RLS and created policy for table: %', tbl;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to enable RLS/policy for table %: %', tbl, SQLERRM;
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
      -- First drop existing trigger if it exists
      EXECUTE format('DROP TRIGGER IF EXISTS update_%I_timestamp ON %I', tbl, tbl);
      
      -- Create new trigger
      EXECUTE format('CREATE TRIGGER update_%I_timestamp
        BEFORE UPDATE ON %I
        FOR EACH ROW EXECUTE FUNCTION update_timestamp()', tbl, tbl);
        
      RAISE NOTICE 'Created timestamp trigger for table: %', tbl;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to create trigger for table %: %', tbl, SQLERRM;
    END;
  END LOOP;
END
$$;
