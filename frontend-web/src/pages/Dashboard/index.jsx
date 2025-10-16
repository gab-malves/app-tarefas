import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        api.get('/tasks').then(response => {
        setTasks(response.data);
        });
    }, []);

    async function handleAddTask(event) {
        event.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            const response = await api.post('/tasks', { title: newTaskTitle });
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (err) {
            alert('Erro ao adicionar tarefa.');
        }
    }

    async function handleToggleTask(id, completed) {
        try {
            await api.put(`/tasks/${id}`, { completed: !completed });
            const updatedTasks = tasks.map(task =>
            task._id === id ? { ...task, completed: !completed } : task
            );
            setTasks(updatedTasks);
        } catch (err) {
            alert('Erro ao atualizar tarefa.');
        }
    }

    async function handleDeleteTask(id) {
        try {
            await api.delete(`/tasks/${id}`);
            const filteredTasks = tasks.filter(task => task._id !== id);
            setTasks(filteredTasks);
        } catch (err) {
            alert('Erro ao apagar tarefa.');
        }
    }

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Bem-vindo, {user?.login}!</h1>
                <button onClick={signOut} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#f63b3b' }}>
                    Sair
                </button>
            </header>

            <form onSubmit={handleAddTask} style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Adicionar uma nova tarefa"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>
                    Adicionar
                </button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <li key={task._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task._id, task.completed)}
                            style={{ marginRight: '15px', width: '20px', height: '20px' }}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1, color: task.completed ? '#aaa' : '#333' }}>
                            {task.title}
                        </span>
                        <button onClick={() => handleDeleteTask(task._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#aaa', marginLeft: '15px' }}>
                            Apagar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}