import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Cadastro() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSignUp(event) {
        event.preventDefault();

        if (!login || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await api.post('/users', { login, password });
            alert('Registo efetuado com sucesso! Será redirecionado para o login.');
            navigate('/');
        } catch (err) {
            console.error("Erro no registo:", err);
            if (err.response && err.response.data && err.response.data.error) {
                alert(`Falha no registo: ${err.response.data.error}`);
            } else {
                alert('Não foi possível conectar ao servidor. Verifique se o back-end está a rodar e tente novamente.');
            }
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>Crie sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="login" style={{ display: 'block', marginBottom: '8px' }}>Usuário</label>
                            <input
                                id="login"
                                type="text"
                                placeholder="Escolha um nome de usuário"
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
                                placeholder="Crie uma senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                                Registar
                            </button>
                        </form>
                        <p style={{ textAlign: 'center', marginTop: '16px' }}>
                            Já tem uma conta? <Link to="/" style={{ color: '#3b82f6' }}>Faça login</Link>
                        </p>
                    </div>
                </div>
    );
}
