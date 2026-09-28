import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Sparkles } from 'lucide-react';

const Protected = ({ children }) => {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        gap: '16px'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--grad-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: 'var(--shadow-glow)'
        }} className="pulse-glow">
          <Sparkles size={28} />
        </div>
        <div style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em'
        }}>
          Authenticating session...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
