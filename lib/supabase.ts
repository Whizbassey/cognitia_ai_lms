import { createClient } from '@supabase/supabase-js'
import { auth } from "@clerk/nextjs/server"

export const createSupabaseClient = (useAuth = true) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    }

    if (!supabaseAnonKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
    }

    // For public (unauthenticated) reads, skip the Clerk auth token entirely.
    // Calling auth() on public pages where no session exists can cause fetch failures.
    if (!useAuth) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }

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