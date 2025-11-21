import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  userId: string;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("anb_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("anb_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Simple login logic - in a real app, this would call an API
  const login = async (userId: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, accept any credentials
        if (userId && password) {
          const newUser: User = {
            userId,
            name: "Demo User",
            email: `${userId}@anbbank.com`,
          };

          setUser(newUser);
          localStorage.setItem("anb_user", JSON.stringify(newUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("anb_user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
