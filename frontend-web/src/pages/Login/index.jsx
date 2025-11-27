import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            await signIn(login, password);
            } catch (err) {
                alert(err.message);
            }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>Faça seu login</h1>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="login" style={{ display: 'block', marginBottom: '8px' }}>Usuário</label>
                            <input
                                id="login"
                                type="text"
                                placeholder="Seu nome de usuário"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Senha</label>
                            <input
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                            Entrar
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', marginTop: '16px' }}>
                        Não tem uma conta? <Link to="/cadastro" style={{ color: '#3b82f6' }}>Registe-se</Link>
                    </p>
                </div>
            </div>
    );
}