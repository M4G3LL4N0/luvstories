-- Enable RLS for all tables
alter table "public"."stories" enable row level security;
alter table "public"."story_profiles" enable row level security;
alter table "public"."story_events" enable row level security;
alter table "public"."story_notes" enable row level security;
alter table "public"."story_scores" enable row level security;
alter table "public"."story_reports" enable row level security;

-- Stories table
create table "public"."stories" (
  "id" uuid primary key default uuid_generate_v4(),
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "title" text not null,
  "status" text default 'active',
  "privacy_level" text default 'private',
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updated_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Story profiles table
create table "public"."story_profiles" (
  "id" uuid primary key default uuid_generate_v4(),
  "story_id" uuid references "public"."stories"(id) on delete cascade not null,
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "subject_name" text,
  "relationship_type" text,
  "summary" text,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updated_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Story events table
create table "public"."story_events" (
  "id" uuid primary key default uuid_generate_v4(),
  "story_id" uuid references "public"."stories"(id) on delete cascade not null,
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "title" text not null,
  "description" text,
  "event_type" text,
  "emotional_tone" text,
  "impact_score" integer,
  "occurred_at" timestamp with time zone,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Story notes table
create table "public"."story_notes" (
  "id" uuid primary key default uuid_generate_v4(),
  "story_id" uuid references "public"."stories"(id) on delete cascade not null,
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "title" text not null,
  "body" text,
  "body_encrypted" text,
  "is_encrypted" boolean default false,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updated_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Story scores table
create table "public"."story_scores" (
  "id" uuid primary key default uuid_generate_v4(),
  "story_id" uuid references "public"."stories"(id) on delete cascade not null,
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "trust_score" integer,
  "consistency_score" integer,
  "reciprocity_score" integer,
  "attraction_score" integer,
  "emotional_safety_score" integer,
  "volatility_score" integer,
  "repair_potential_score" integer,
  "relationship_potential_score" integer,
  "updated_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Story reports table
create table "public"."story_reports" (
  "id" uuid primary key default uuid_generate_v4(),
  "story_id" uuid references "public"."stories"(id) on delete cascade not null,
  "user_id" uuid references auth.users(id) on delete cascade not null,
  "report_type" text not null,
  "title" text not null,
  "content" text,
  "content_encrypted" text,
  "is_encrypted" boolean default false,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updated_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
create policy "Users can only access their own stories"
on "public"."stories"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can only access their own story profiles"
on "public"."story_profiles"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can only access their own story events"
on "public"."story_events"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can only access their own story notes"
on "public"."story_notes"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can only access their own story scores"
on "public"."story_scores"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can only access their own story reports"
on "public"."story_reports"
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
