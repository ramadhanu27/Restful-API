import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export const BUCKET_NAME = supabaseBucket;

// Helper function to get file from Supabase Storage
export async function getFileFromStorage(filePath) {
  try {
    console.log(`📥 Fetching from Supabase: ${BUCKET_NAME}/${filePath}`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(filePath);

    if (error) {
      console.error(`❌ Supabase error for ${filePath}:`, error.message);
      throw error;
    }

    if (!data) {
      throw new Error(`No data returned for ${filePath}`);
    }

    const text = await data.text();
    const json = JSON.parse(text);
    console.log(`✅ Successfully fetched ${filePath}`);
    return json;
  } catch (error) {
    console.error(`❌ Error fetching ${filePath}:`, error.message || error);
    throw error;
  }
}

// Helper function to get public URL
export function getPublicUrl(filePath) {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}
