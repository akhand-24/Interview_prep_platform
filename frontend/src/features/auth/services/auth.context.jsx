import React, { createContext, useState, useEffect } from 'react';
import { getme, login as loginApi, logout as logoutApi, register as registerApi } from './auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await getme();
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn('Initial session check:', err);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await loginApi({ email, password });
      if (data && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else if (data && data.message) {
        throw new Error(data.message);
      }
      return { success: false, message: 'Invalid server response' };
    } catch (err) {
      const msg = err.message || 'Login failed';
      setAuthError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await registerApi({ username, email, password });
      if (data && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else if (data && data.message) {
        throw new Error(data.message);
      }
      return { success: false, message: 'Invalid server response' };
    } catch (err) {
      const msg = err.message || 'Registration failed';
      setAuthError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutApi();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        authChecked,
        authError,
        setAuthError,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
