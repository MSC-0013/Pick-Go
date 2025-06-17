import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name?: string;
  role: 'user' | 'admin';
  id: string;
  registrationDate?: string;
  _id?: string;
  isAdmin?: boolean;
}

interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  carId: number;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  totalDays: number;
  pricePerDay: number;
  subtotal: number;
  tax: number;
  total: number;
  bookingDate: string;
  additionalRequests?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  getAllUsers: () => User[];
  getAllBookings: () => Booking[];
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  updatePaymentStatus: (bookingId: string, status: Booking['paymentStatus']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if axios is available (for backend integration)
  const hasBackend = typeof window !== 'undefined' && window.navigator.onLine;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  let axiosInstance: any = null;
  if (hasBackend) {
    try {
      // Dynamically import axios if available
      import('axios').then((axios) => {
        axiosInstance = axios.default.create({
          baseURL: API_URL,
          withCredentials: true,
        });
      }).catch(() => {
        console.log('Axios not available, using localStorage fallback');
      });
    } catch {
      console.log('Backend not available, using localStorage');
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      // Try backend first if available
      if (axiosInstance) {
        try {
          const { data } = await axiosInstance.get('/auth/profile');
          const isAdmin = data.email === 'admin@gmail.com';
          setUser({ 
            ...data, 
            role: isAdmin ? 'admin' : 'user',
            id: data._id || data.id,
            isAdmin 
          });
          setLoading(false);
          return;
        } catch (error) {
          console.log('Backend auth failed, falling back to localStorage');
        }
      }

      // Fallback to localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          isAdmin: parsedUser.role === 'admin' || parsedUser.email === 'admin@gmail.com'
        });
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Admin login (always works locally)
    if (email === 'admin@gmail.com' && password === 'admin123@') {
      const adminUser = {
        email,
        name: 'Admin User',
        role: 'admin' as const,
        id: 'admin-001',
        _id: 'admin-001',
        isAdmin: true,
        registrationDate: '2024-01-01'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setLoading(false);
      return true;
    }

    // Try backend login first if available
    if (axiosInstance) {
      try {
        const { data } = await axiosInstance.post('/auth/login', { email, password });
        const userData = {
          ...data,
          role: 'user' as const,
          id: data._id || data.id,
          isAdmin: false
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store user in users list for admin management
        const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userExists = existingUsers.find((u: User) => u.email === email);
        if (!userExists) {
          existingUsers.push(userData);
          localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        }
        
        setLoading(false);
        return true;
      } catch (err: any) {
        console.error('Backend login failed:', err.response?.data?.message || err.message);
      }
    }

    // Fallback to localStorage-based login
   

    setLoading(false);
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);

    // Try backend registration first if available
    if (axiosInstance) {
      try {
        const { data } = await axiosInstance.post('/auth/register', userData);
        const newUser = {
          ...data,
          role: 'user' as const,
          id: data._id || data.id,
          isAdmin: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Store user in users list
        const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        
        setLoading(false);
        return true;
      } catch (err: any) {
        console.error('Backend registration failed:', err.response?.data?.message || err.message);
      }
    }

   

    setLoading(false);
    return false;
  };

  const logout = async (): Promise<void> => {
    // Try backend logout first if available
    if (axiosInstance) {
      try {
        await axiosInstance.post('/auth/logout');
      } catch (err: any) {
        console.error('Backend logout error:', err.message);
      }
    }

    // Always clear local state
    setUser(null);
    localStorage.removeItem('user');
  };

  const getAllUsers = (): User[] => {
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    return users;
  };

  const getAllBookings = (): Booking[] => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    const bookings = getAllBookings();
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const updatePaymentStatus = (bookingId: string, paymentStatus: Booking['paymentStatus']) => {
    const bookings = getAllBookings();
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, paymentStatus } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
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
    updatePaymentStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
