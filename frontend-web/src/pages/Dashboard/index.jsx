import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    api.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  async function handleAddTask(event) {
    event.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const response = await api.post("/tasks", { title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
    } catch (err) {
      alert("Erro ao adicionar tarefa.");
    }
  }

  async function handleToggleTask(id, completed) {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, completed: !completed } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      alert("Erro ao atualizar tarefa.");
    }
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    } catch (err) {
      alert("Erro ao apagar tarefa.");
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F0F2F5",
      fontFamily: "sans-serif",
      paddingBottom: "40px",
    },
    header: {
      backgroundColor: "#6200ee",
      padding: "40px 20px 80px", // Mais padding embaixo para o input flutuar
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      color: "white",
      display: "flex",
      justifyContent: "center",
    },
    headerContent: {
      width: "100%",
      maxWidth: "700px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    welcome: { fontSize: "24px", fontWeight: "bold", margin: 0 },
    subWelcome: { fontSize: "16px", opacity: 0.8, margin: 0 },
    logoutButton: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      color: "white",
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
    inputContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "-35px", // O segredo do efeito flutuante
      padding: "0 20px",
    },
    form: {
      display: "flex",
      width: "100%",
      maxWidth: "700px",
      gap: "10px",
    },
    input: {
      flex: 1,
      padding: "15px 25px",
      borderRadius: "30px",
      border: "none",
      fontSize: "16px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      outline: "none",
    },
    addButton: {
      width: "54px",
      height: "54px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#03DAC6",
      color: "black",
      fontSize: "28px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(3, 218, 198, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "0",
    },
    listContainer: {
      maxWidth: "700px",
      margin: "40px auto 0",
      padding: "0 20px",
    },
    listTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    taskCard: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      transition: "0.2s",
    },
    taskCardDone: {
      backgroundColor: "#f9f9f9",
      opacity: 0.7,
      boxShadow: "none",
    },
    checkbox: {
      width: "24px",
      height: "24px",
      borderRadius: "6px",
      border: "2px solid #6200ee",
      marginRight: "15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      color: "white",
      fontWeight: "bold",
    },
    checkboxDone: {
      backgroundColor: "#6200ee",
    },
    taskText: {
      flex: 1,
      fontSize: "16px",
      color: "#333",
    },
    taskTextDone: {
      textDecoration: "line-through",
      color: "#888",
    },
    deleteButton: {
      background: "transparent",
      border: "none",
      color: "#ff5252",
      fontSize: "20px",
      cursor: "pointer",
      padding: "5px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Roxo */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <p style={styles.subWelcome}>Olá,</p>
            <h1 style={styles.welcome}>{user?.login || "Usuário"}</h1>
          </div>
          <button onClick={signOut} style={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>

      {/* Input Flutuante */}
      <div style={styles.inputContainer}>
        <form onSubmit={handleAddTask} style={styles.form}>
          <input
            type="text"
            placeholder="Adicionar nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            +
          </button>
        </form>
      </div>

      {/* Lista de Tarefas */}
      <div style={styles.listContainer}>
        <h2 style={styles.listTitle}>Minhas Tarefas</h2>
        <div>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                ...styles.taskCard,
                ...(task.completed ? styles.taskCardDone : {}),
              }}
            >
              <div
                style={{
                  ...styles.checkbox,
                  ...(task.completed ? styles.checkboxDone : {}),
                }}
                onClick={() => handleToggleTask(task._id, task.completed)}
              >
                {task.completed && "✓"}
              </div>
              <span
                style={task.completed ? styles.taskTextDone : styles.taskText}
              >
                {task.title}
              </span>
              <button
                onClick={() => handleDeleteTask(task._id)}
                style={styles.deleteButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
