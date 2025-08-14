import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { handleAuthError } from '../utils/auth';

/**
 * PUBLIC_INTERFACE
 * AuthCallback
 * Handles Supabase auth callback (email confirmation, OTP, OAuth).
 * Uses supabase.auth.getSessionFromUrl() to exchange code for a session.
 * On success, redirects to the home page.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const run = async () => {
      if (!supabase) {
        setStatus('Supabase is not configured. Please set environment variables.');
        setTimeout(() => navigate('/auth/error?type=config'), 1200);
        return;
      }
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl();
        if (error) {
          handleAuthError(error, navigate);
          return;
        }
        if (data?.session) {
          setStatus('Authenticated! Redirecting...');
          // Redirect to a reasonable destination
          navigate('/orders', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        handleAuthError(err, navigate);
      }
    };

    run();
  }, [navigate]);

  return <div className="muted">{status}</div>;
}
