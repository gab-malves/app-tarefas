import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Cadastro() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignUp(event) {
    event.preventDefault();
    if (!login || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    try {
      await api.post("/users", { login, password });
      alert("Registo efetuado com sucesso! Será redirecionado para o login.");
      navigate("/");
    } catch (err) {
      console.error("Erro no registo:", err);
      const msg = err.response?.data?.error || "Falha no registo.";
      alert(msg);
    }
  }

  // Reutilizando os estilos do Login, mas mudando as cores do botão
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#F0F2F5",
      fontFamily: "sans-serif",
    },
    card: {
      background: "white",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#333", // Título escuro para diferenciar
      marginBottom: "10px",
    },
    subtitle: {
      color: "#666",
      marginBottom: "40px",
    },
    inputGroup: { marginBottom: "20px", textAlign: "left" },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#333",
      fontWeight: "600",
      marginLeft: "10px",
    },
    input: {
      width: "100%",
      padding: "15px 20px",
      borderRadius: "25px",
      border: "1px solid #e0e0e0",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FFF",
    },
    button: {
      width: "100%",
      padding: "15px",
      borderRadius: "25px",
      border: "none",
      backgroundColor: "#03DAC6", // Verde Água (Teal)
      color: "black", // Texto preto para contraste
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: "0 4px 10px rgba(3, 218, 198, 0.3)",
      transition: "0.3s",
    },
    linkText: { marginTop: "25px", color: "#666", fontSize: "14px" },
    link: { color: "#03DAC6", fontWeight: "bold", textDecoration: "none" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Nova Conta</h1>
        <p style={styles.subtitle}>Organize suas tarefas de forma fácil</p>

        <form onSubmit={handleSignUp}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Escolha seu usuário</label>
            <input
              type="text"
              placeholder="Ex: joaosilva"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Escolha sua senha</label>
            <input
              type="password"
              placeholder="No mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            CRIAR CONTA
          </button>
        </form>

        <p style={styles.linkText}>
          Já tem uma conta?{" "}
          <Link to="/" style={styles.link}>
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
