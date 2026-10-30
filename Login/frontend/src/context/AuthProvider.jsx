import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the user when the app starts or refreshes.
  const refreshUser = useCallback(
    async () => {
      try {
        const data = await api.me();
        setUser(data.user);
  
        return data.user;
      } catch (error) {
        setUser(null);

        if (error.status !== 401) {
          console.error("Session verification failed:",error);
        }

        return null;
      } finally {
        setLoading(false);
      }
    }, []
  );

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email, password) => {
    const data = await api.login({email, password});

    // The server has created the session and returned the user.
    setUser(data.user);

    return data.user;
  }

  const register = async (name, email, password) => {
    return api.register({name, email, password});
  }

  const logout = async () => {
    // Clear local auth state only after the confirms logout
    await api.logout();
    setUser(null);
  }

  const value = {
    user, loading, isAuthenticated: Boolean(user), login, register, logout, refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used in an AuthProvider");
    
  }

  return context;
}

