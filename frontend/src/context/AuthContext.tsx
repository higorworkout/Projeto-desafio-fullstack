import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AxiosError } from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  // adicione outros campos do usuário conforme seu backend
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  login: (signinData: SignInData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  error: null,
  login: async () => {},
  logout: () => {},
  setLoading: () => {},
  loading: false
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const loadUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      //navigate('/login');
      return;
    }

    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data); 
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token inválido ou expirado', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }

     };
     loadUser();
    }, []);

  // Função para login
  async function login(signinData: SignInData) {
    console.log(signinData)
    setError(null);
    try {
      const response = await api.post('http://localhost:3000/auth/signin', signinData);
      console.log(response)
      
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorResponse = axiosError.response?.data as { message?: string } | undefined;
      const message = errorResponse?.message || 'Erro ao fazer login';
      setError(message);
      setIsAuthenticated(false);
      setUser(null);
      console.error('Login error:', message);
    }
  }

  // Função para logout
  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    navigate('/login');
  }



  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}