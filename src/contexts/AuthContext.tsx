
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/database';
import { RateLimiter, sanitizeInput, isValidRole } from '@/utils/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata: { full_name: string; campus: string; role: string }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rate limiter for authentication attempts
const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log('Profile fetched:', data);
      return data as Profile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          
          // Fetch profile with security delay to prevent race conditions
          setTimeout(async () => {
            if (mounted) {
              const profileData = await fetchProfile(session.user.id);
              if (mounted) {
                setProfile(profileData);
              }
            }
          }, 0);
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // THEN initialize auth state
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session:', session?.user?.id);
          
          if (session?.user && mounted) {
            setSession(session);
            setUser(session.user);
            
            // Fetch profile with security delay
            setTimeout(async () => {
              if (mounted) {
                const profileData = await fetchProfile(session.user.id);
                if (mounted) {
                  setProfile(profileData);
                }
              }
            }, 0);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    // Input validation and sanitization
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    
    if (!sanitizedEmail || !password) {
      return { error: { message: 'Email dan password harus diisi' } };
    }

    // Rate limiting
    const clientId = sanitizedEmail;
    if (!authRateLimiter.isAllowed(clientId)) {
      const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(clientId) / 60000);
      return { 
        error: { 
          message: `Terlalu banyak percobaan login. Coba lagi dalam ${remainingTime} menit.` 
        } 
      };
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
    // Don't set loading to false here, let the auth state change handle it
  };

  const signUp = async (email: string, password: string, metadata: { full_name: string; campus: string; role: string }) => {
    // Input validation and sanitization
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedFullName = sanitizeInput(metadata.full_name);
    const sanitizedCampus = sanitizeInput(metadata.campus);
    const sanitizedRole = sanitizeInput(metadata.role);

    if (!sanitizedEmail || !password || !sanitizedFullName || !sanitizedCampus) {
      return { error: { message: 'Semua field harus diisi' } };
    }

    // Validate role - only allow anggota_biasa for new signups
    if (sanitizedRole !== 'anggota_biasa') {
      return { error: { message: 'Role tidak valid' } };
    }

    // Rate limiting
    const clientId = sanitizedEmail;
    if (!authRateLimiter.isAllowed(clientId)) {
      const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(clientId) / 60000);
      return { 
        error: { 
          message: `Terlalu banyak percobaan registrasi. Coba lagi dalam ${remainingTime} menit.` 
        } 
      };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: sanitizedFullName,
            campus: sanitizedCampus,
            role: sanitizedRole, // This will always be 'anggota_biasa'
          }
        }
      });
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthContext: Starting sign out process...');
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthContext: Sign out error:', error);
        throw error;
      }
      
      console.log('AuthContext: Sign out successful');
      
      // Clear local state immediately
      setUser(null);
      setSession(null);
      setProfile(null);
      setLoading(false);
    } catch (error) {
      console.error('AuthContext: Error in signOut:', error);
      // Clear local state even if there's an error
      setUser(null);
      setSession(null);
      setProfile(null);
      setLoading(false);
      throw error;
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('Auth State Debug:', {
      user: user?.id,
      email: user?.email,
      profile: profile?.id,
      role: profile?.role,
      loading
    });
  }, [user, profile, loading]);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
