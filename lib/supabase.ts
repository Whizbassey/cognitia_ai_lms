import { createClient } from '@supabase/supabase-js'
import { auth } from "@clerk/nextjs/server"

export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    }

    if (!supabaseAnonKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
    }

    console.log('Creating Supabase client with URL:', supabaseUrl);

    return createClient(supabaseUrl, supabaseAnonKey, {
        async accessToken() {
            try {
                const { getToken } = await auth();
                return await getToken();
            } catch (error) {
                console.error('Error getting auth token:', error);
                return null;
            }
        },
    })
}