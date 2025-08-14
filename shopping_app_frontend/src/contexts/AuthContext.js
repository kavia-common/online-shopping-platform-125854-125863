import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth
 * Hook to access authentication state and actions.
 */
export function useAuth() {
  /** Returns the current auth context value. */
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider
 * Context provider for Supabase authentication.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let subscription = null;

    async function init() {
      if (!supabase) {
        setReady(true);
        return;
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setReady(true);

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);
      });

      subscription = authListener?.subscription ?? null;
    }

    init();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  /**
   * PUBLIC_INTERFACE
   * signIn
   * Sign in using email/password via Supabase.
   */
  async function signIn({ email, password }) {
    if (!supabase) throw new Error('Supabase is not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  /**
   * PUBLIC_INTERFACE
   * signUp
   * Registers a new user with email/password.
   * Uses REACT_APP_SITE_URL (optional) to set email redirect URL.
   */
  async function signUp({ email, password }) {
    if (!supabase) throw new Error('Supabase is not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.');
    const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${siteUrl}/login` },
    });
    if (error) throw error;
    return data;
  }

  /**
   * PUBLIC_INTERFACE
   * signOut
   * Signs out the current user.
   */
  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  const value = useMemo(
    () => ({ user, session, ready, signIn, signUp, signOut }),
    [user, session, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
