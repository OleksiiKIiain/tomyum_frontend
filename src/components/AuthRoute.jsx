import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchMe } from '../services/api';

const AuthRoute = ({ children, requireSuperuser = false }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requireSuperuser && !user.is_superuser) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AuthRoute;
