import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function createUser(email: string, name: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, name }])
    .select();

  if (error) throw error;
  return data;
}

export async function getUserVideos(userId: string) {
  const { data, error } = await supabase
    .from('generated_videos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function saveGeneratedVideo(
  userId: string,
  productId: string,
  styleId: string,
  videoUrl: string,
  duration: number
) {
  const { data, error } = await supabase
    .from('generated_videos')
    .insert([
      {
        user_id: userId,
        product_id: productId,
        style_id: styleId,
        video_url: videoUrl,
        duration,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}
