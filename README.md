# LuvStories - Private Relationship Intelligence

LuvStories is a private relationship intelligence platform that helps users build, understand, and shape their love stories through private workspaces.

## Features

- Private story workspaces
- Relationship timeline tracking
- Secure notes and reports
- Relationship scoring system
- End-to-end encryption support
- Privacy-first architecture

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ENCRYPTION_SECRET=your-encryption-secret
```

4. Run the SQL migrations in your Supabase database:

```sql
-- Run the migrations from migrations/20240408000000_create_private_tables.sql
```

5. Start the development server:

```bash
npm run dev
```

## Database Schema

The application uses the following tables:

- `stories`: Main story workspaces
- `story_profiles`: Relationship profiles
- `story_events`: Timeline events
- `story_notes`: Private notes
- `story_scores`: Relationship scores
- `story_reports`: Generated reports

All tables are protected by Row Level Security (RLS) and can only be accessed by the owning user.

## Deployment

The easiest way to deploy is using Vercel:

```bash
vercel deploy
```

## Security

The application includes:
- Row Level Security on all tables
- Optional end-to-end encryption for sensitive data
- Secure authentication flow
- Privacy-first architecture

All user data is private and never shared.
