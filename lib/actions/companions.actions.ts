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