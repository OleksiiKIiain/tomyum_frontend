import React, { createContext, useState, useEffect } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  fetchMe,
} from '../services/api.js';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async ({ email, password }) => {
    await apiLogin({ email, password });
    const me = await fetchMe();
    setUser(me);
  };

  const signOut = async () => {
    await apiLogout();
    setUser(null);
  };

  const signUp = async ({ email, password }) => {
    await apiRegister({ email, password });
    await signIn({ email, password });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}