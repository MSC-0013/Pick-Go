import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasBackend = typeof window !== 'undefined' && window.navigator.onLine;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  let axiosInstance = null;
  if (hasBackend) {
    try {
      import('axios')
        .then((axios) => {
          axiosInstance = axios.default.create({
            baseURL: API_URL,
            withCredentials: true,
          });
        })
        .catch(() => {
          console.log('Axios not available, using localStorage fallback');
        });
    } catch {
      console.log('Backend not available, using localStorage');
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      if (axiosInstance) {
        try {
          const { data } = await axiosInstance.get('/auth/profile');
          const isAdmin = data.email === 'admin@gmail.com';
          setUser({
            ...data,
            role: isAdmin ? 'admin' : 'user',
            id: data._id || data.id,
            isAdmin,
          });
          setLoading(false);
          return;
        } catch (error) {
          console.log('Backend auth failed, falling back to localStorage');
        }
      }

      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          isAdmin: parsedUser.role === 'admin' || parsedUser.email === 'admin@gmail.com',
        });
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    if (email === 'admin@gmail.com' && password === 'admin123@') {
      const adminUser = {
        email,
        name: 'Admin User',
        role: 'admin',
        id: 'admin-001',
        _id: 'admin-001',
        isAdmin: true,
        registrationDate: '2024-01-01',
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setLoading(false);
      return true;
    }

    if (axiosInstance) {
      try {
        const { data } = await axiosInstance.post('/auth/login', { email, password });
        const userData = {
          ...data,
          role: 'user',
          id: data._id || data.id,
          isAdmin: false,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userExists = existingUsers.find((u) => u.email === email);
        if (!userExists) {
          existingUsers.push(userData);
          localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        }

        setLoading(false);
        return true;
      } catch (err) {
        console.error('Backend login failed:', err.response?.data?.message || err.message);
      }
    }

    setLoading(false);
    return false;
  };

  const register = async (userData) => {
    setLoading(true);

    if (axiosInstance) {
      try {
        const { data } = await axiosInstance.post('/auth/register', userData);
        const newUser = {
          ...data,
          role: 'user',
          id: data._id || data.id,
          isAdmin: false,
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));

        const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));

        setLoading(false);
        return true;
      } catch (err) {
        console.error('Backend registration failed:', err.response?.data?.message || err.message);
      }
    }

    setLoading(false);
    return false;
  };

  const logout = async () => {
    if (axiosInstance) {
      try {
        await axiosInstance.post('/auth/logout');
      } catch (err) {
        console.error('Backend logout error:', err.message);
      }
    }

    setUser(null);
    localStorage.removeItem('user');
  };

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('allUsers') || '[]');
  };

  const getAllBookings = () => {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  };

  const updateBookingStatus = (bookingId, status) => {
    const bookings = getAllBookings();
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const updatePaymentStatus = (bookingId, paymentStatus) => {
    const bookings = getAllBookings();
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, paymentStatus } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.isAdmin === true,
    loading,
    getAllUsers,
    getAllBookings,
    updateBookingStatus,
    updatePaymentStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
