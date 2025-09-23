'use server';

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { redirect } from "next/navigation";

type CreateCompanion = {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
};

export const createCompanion = async (formData: CreateCompanion) => {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            redirect('/sign-in');
        }

        const supabase = createSupabaseClient();

        const { data, error } = await supabase
            .from('companions')
            .insert({...formData, author: userId})
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message || 'Failed to Create a Companion');
        }

        if (!data || data.length === 0) {
            throw new Error('No data returned from database');
        }

        return data[0];
    } catch (error) {
        console.error('Error in createCompanion:', error);
        throw error;
    }
}

export const getAllCompanions  = async ({ limit = 10, page = 1, subject, topic }:  GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%` )  
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`) 
    } else if (topic) {
        query = query.or (`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1 )

    const { data:companions, error} = await query;

    if(error) throw new Error(error.message);

    return companions;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

   const { data, error} = await supabase
    .from('companions')
    .select()
    .eq ('id', id)

    if(error) return console.log(error);

    return data[0];

} 

export const addToSessionHistory = async (companionId: string) => {
    try {
      const { userId } = await auth();
      console.log("🔎 Adding session history → userId:", userId, "companionId:", companionId);
  
      if (!userId) {
        throw new Error("No userId found from auth()");
      }
  
      const supabase = createSupabaseClient();
  
      const { data, error } = await supabase
        .from("session_history")
        .insert({
          companion_id: companionId,
          user_id: userId,
        })
        .select(); // return inserted row(s)
  
      if (error) {
        console.error("❌ Supabase insert error:", error);
        throw new Error(error.message);
      }
  
      console.log("✅ Session history inserted:", data);
      return data;
    } catch (err) {
      console.error("⚠️ addToSessionHistory failed:", err);
      throw err;
    }
  };

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('companions:companion_id(*)')
        .order('created_at', {ascending: false})
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions );

}


export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('companions:companion_id(*)')
        .eq ('user_id', userId)
        .order('created_at', {ascending: false})
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions );

}