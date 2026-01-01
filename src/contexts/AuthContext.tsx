import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('pointpath_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser = { id: '1', email, name: email.split('@')[0] };
    localStorage.setItem('pointpath_user', JSON.stringify(mockUser));
    localStorage.setItem('pointpath_token', 'mock-jwt-token');
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulated signup - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser = { id: '1', email, name };
    localStorage.setItem('pointpath_user', JSON.stringify(mockUser));
    localStorage.setItem('pointpath_token', 'mock-jwt-token');
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('pointpath_user');
    localStorage.removeItem('pointpath_token');
    localStorage.removeItem('pointpath_trip_id');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
