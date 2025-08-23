import React, { useState } from 'react';

function SignupForm({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId: username, password })
      });
      const data = await res.json();
      if (data.user) {
        onSignup(username);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Signup error');
    }
  };

  return (
    <form
      style={{
        maxWidth: 400,
        width: '100%',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: 32,
        alignItems: 'center',
      }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ color: '#1caad9', marginBottom: 12, fontWeight: 700 }}>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{
          padding: '12px 16px',
          fontSize: 17,
          borderRadius: 8,
          border: '1px solid #1caad9',
          outline: 'none',
          marginBottom: 10,
          width: '100%',
          background: '#f6f6f6',
          color: '#1caad9',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          padding: '12px 16px',
          fontSize: 17,
          borderRadius: 8,
          border: '1px solid #1caad9',
          outline: 'none',
          marginBottom: 10,
          width: '100%',
          background: '#f6f6f6',
          color: '#e94560',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 0',
          fontSize: 18,
          background: 'linear-gradient(90deg, #1caad9 60%, #e94560 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          width: '100%',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          marginTop: 8,
        }}
      >
        Sign Up
      </button>
      {error && <div style={{ color: '#e94560', marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default SignupForm;
