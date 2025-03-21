import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  title: string | null;
  bio: string | null;
  social_links: Record<string, string>;
}

interface AuthState {
  isAuthenticated: boolean;
  profile: Profile | null;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  profile: null,

  checkAuth: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      set({ isAuthenticated: true, profile });
    } else {
      set({ isAuthenticated: false, profile: null });
    }
  },

  login: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    await useAuthStore.getState().checkAuth();
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ isAuthenticated: false, profile: null });
  },
}));