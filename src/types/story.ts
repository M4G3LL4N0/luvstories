export type Story = {
  id: string;
  user_id: string;
  title: string;
  status: 'active' | 'archived' | 'deleted';
  privacy_level: 'private' | 'shared';
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
};

export type StoryProfile = {
  id: string;
  story_id: string;
  user_id: string;
  subject_name?: string;
  relationship_type?: string;
  summary?: string;
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
};

export type StoryEvent = {
  id: string;
  story_id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type?: string;
  emotional_tone?: string;
  impact_score?: number;
  occurred_at: string;
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
};

export type StoryNote = {
  id: string;
  story_id: string;
  user_id: string;
  title: string;
  content: string;
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
};

export type StoryScore = {
  id: string;
  story_id: string;
  user_id: string;
  trust_score?: number;
  consistency_score?: number;
  reciprocity_score?: number;
  attraction_score?: number;
  emotional_safety_score?: number;
  volatility_score?: number;
  repair_potential_score?: number;
  relationship_potential_score?: number;
  created_at: string;
  updated_at: string;
};

export type StoryReport = {
  id: string;
  story_id: string;
  user_id: string;
  report_type: string;
  content: any;
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
};

export type StoryWithRelations = Story & {
  profile?: StoryProfile;
  events?: StoryEvent[];
  notes?: StoryNote[];
  scores?: StoryScore;
  reports?: StoryReport[];
};
