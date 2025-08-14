import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Login
 * Email/password login using Supabase.
 */
export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(form);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <form className="card" onSubmit={submit} style={{ padding: 12 }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <label className="muted">Email</label>
        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="muted">Password</label>
        <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}
        <div className="muted" style={{ marginTop: 8 }}>
          No account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
