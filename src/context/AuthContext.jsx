import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('jobhuntly_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/job_huntly/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setCurrentUser(data.user);
    localStorage.setItem('jobhuntly_user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (userData) => {
    const response = await fetch('http://localhost:5000/job_huntly/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    const registeredUser = {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`
    };

    setCurrentUser(registeredUser);
    localStorage.setItem('jobhuntly_user', JSON.stringify(registeredUser));
    return registeredUser;
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
