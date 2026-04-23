import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const { data } = await authAPI.profile();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('cms_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (payload) => {
    const { data } = await authAPI.login(payload);
    localStorage.setItem('cms_token', data.token);
    setUser(data.user);
    toast.success('Welcome back');
  };

  const register = async (payload) => {
    const { data } = await authAPI.register(payload);
    localStorage.setItem('cms_token', data.token);
    setUser(data.user);
    toast.success('Account created');
  };

  const logout = () => {
    localStorage.removeItem('cms_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refreshProfile: loadProfile,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
