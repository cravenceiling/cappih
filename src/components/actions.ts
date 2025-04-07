'use server';

import { createClient } from '@/lib/supabase/server';

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
  }

  return error;
}
