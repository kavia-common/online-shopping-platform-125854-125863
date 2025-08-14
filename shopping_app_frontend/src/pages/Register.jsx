import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Register
 * Email/password registration using Supabase with email redirect.
 */
export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      await signUp(form);
      setInfo('Registration successful. Please check your email to confirm your address, then login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <form className="card" onSubmit={submit} style={{ padding: 12 }}>
        <h2 style={{ marginTop: 0 }}>Register</h2>
        <label className="muted">Email</label>
        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="muted">Password</label>
        <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
        {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}
        {info && <div style={{ color: 'var(--success)', marginTop: 8 }}>{info}</div>}
        <div className="muted" style={{ marginTop: 8 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
