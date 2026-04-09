'use server';

import { createServer } from '@/lib/supabase/server';
import { encryptText } from '@/lib/security/encryption';
import type {
  Story,
  StoryEvent,
  StoryNote,
  StoryProfile,
  StoryReport,
  StoryScore
} from '@/types/story';

export async function createStory(title: string): Promise<Story> {
  const supabase = await createServer();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const { data: story, error } = await supabase
    .from('stories')
    .insert({
      user_id: user.id,
      title,
      status: 'active',
      privacy_level: 'private'
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return story;
}

export async function addEvent(
  storyId: string,
  eventData: Omit<StoryEvent, 'id' | 'story_id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<StoryEvent> {
  const supabase = await createServer();
  
  // Validate authentication
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Authentication required');
  }

  // Validate story ownership
  const { error: ownershipError } = await supabase
    .from('stories')
    .select('id')
    .eq('id', storyId)
    .eq('user_id', user.id)
    .single();

  if (ownershipError) {
    throw new Error('Story not found or access denied');
  }

  // Validate required fields
  if (!eventData.title || !eventData.occurred_at) {
    throw new Error('Title and date are required');
  }

  try {
    const { data: event, error } = await supabase
      .from('story_events')
      .insert({
        story_id: storyId,
        user_id: user.id,
        title: eventData.title,
        description: eventData.description,
        event_type: eventData.event_type,
        emotional_tone: eventData.emotional_tone,
        impact_score: eventData.impact_score,
        occurred_at: eventData.occurred_at,
        is_encrypted: eventData.is_encrypted || false
      })
      .select('*')
      .single();

    if (error) throw error;
    return event;
  } catch (error) {
    console.error('Failed to add event:', error);
    throw new Error('Failed to create event');
  }
}

export async function addNote(
  storyId: string,
  noteData: Omit<StoryNote, 'id' | 'story_id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<StoryNote> {
  const supabase = await createServer();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const content = noteData.is_encrypted 
    ? encryptText(noteData.content)
    : noteData.content;

  const { data: note, error } = await supabase
    .from('story_notes')
    .insert({
      story_id: storyId,
      user_id: user.id,
      title: noteData.title,
      content,
      is_encrypted: noteData.is_encrypted
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return note;
}

export async function updateProfile(
  storyId: string,
  profileData: Omit<StoryProfile, 'id' | 'story_id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<StoryProfile> {
  const supabase = await createServer();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const { data: profile, error } = await supabase
    .from('story_profiles')
    .upsert({
      story_id: storyId,
      user_id: user.id,
      subject_name: profileData.subject_name,
      relationship_type: profileData.relationship_type,
      summary: profileData.summary,
      is_encrypted: profileData.is_encrypted
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return profile;
}

export async function generateReport(
  storyId: string,
  reportType: string
): Promise<StoryReport> {
  const supabase = await createServer();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  // In a real app, this would analyze the story data
  const reportContent = {
    generated_at: new Date().toISOString(),
    analysis: "This is a sample report. In a real app, this would contain analysis of your relationship data."
  };

  const { data: report, error } = await supabase
    .from('story_reports')
    .insert({
      story_id: storyId,
      user_id: user.id,
      report_type: reportType,
      content: reportContent
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return report;
}
