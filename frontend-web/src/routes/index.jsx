import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';

function PrivateRoute({ children }) {
    const { signed } = useAuth();
    return signed ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    const { signed } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública que redireciona para o dashboard se o utilizador estiver logado */}
                <Route path="/" element={signed ? <Navigate to="/dashboard" /> : <Login />} />
                {/*Rota pública para registo de novos utilizadores */}
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Rota privada que só pode ser acedida se o utilizador estiver logado */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }  
                />
            </Routes>
        </BrowserRouter>
    );
}