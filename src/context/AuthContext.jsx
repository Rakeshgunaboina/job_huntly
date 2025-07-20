import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    // Mock implementation
    const user = { 
      email, 
      name: 'Test User', 
      userType: 'student',
      id: 'user-' + Math.random().toString(36).substr(2, 9)
    };
    setCurrentUser(user);
    localStorage.setItem('jobhuntly_user', JSON.stringify(user));
    return user;
  };

  const register = async (userData) => {
    // Mock implementation
    const user = { 
      ...userData, 
      id: 'user-' + Math.random().toString(36).substr(2, 9)
    };
    setCurrentUser(user);
    localStorage.setItem('jobhuntly_user', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jobhuntly_user');
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}