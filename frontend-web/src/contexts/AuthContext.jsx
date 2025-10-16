import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');
        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);
    
    async function signIn(login, password) {
        try {
            const response = await api.post('/sessions', { login, password });
            const { user, token } = response.data;
            setUser(user);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            localStorage.setItem('@App:user', JSON.stringify(user));
            localStorage.setItem('@App:token', token);
        } catch (error) {
            throw new Error('Falha no login, verifique suas credenciais.');
        }
    }
    function signOut() {
        setUser(null);
        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}