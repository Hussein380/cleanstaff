import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Configure Axios defaults
axios.defaults.baseURL = 'https://cleanstaff-n8rw.vercel.app/api';

interface User {
    _id: string;
    email: string;
    role: 'admin' | 'staff' | 'client';
    profile?: string; // ID of the profile
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, pass: string) => Promise<User>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    // Set default auth header if token exists
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            // Verify token / Get User
            axios.get('/auth/me')
                .then(res => {
                    setUser(res.data.data.user);
                })
                .catch(() => {
                    logout();
                })
                .finally(() => setIsLoading(false));
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setIsLoading(false);
        }
    }, [token]);

    const login = async (email: string, pass: string) => {
        try {
            const res = await axios.post('/auth/login', { email, password: pass });
            const newToken = res.data.token;
            setToken(newToken);
            const userData = res.data.data.user;
            setUser(userData);
            return userData;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isLoading,
            isAuthenticated: !!user
        }}>
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
