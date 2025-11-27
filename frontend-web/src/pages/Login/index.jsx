import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await signIn(login, password);
    } catch (err) {
      alert(err.message);
    }
  }

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
      color: "#6200ee",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#666",
      marginBottom: "40px",
    },
    inputGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
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
      borderRadius: "25px", // Formato pílula
      border: "1px solid #e0e0e0",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FFF",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "15px",
      borderRadius: "25px",
      border: "none",
      backgroundColor: "#6200ee",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: "0 4px 10px rgba(98, 0, 238, 0.3)",
      transition: "0.3s",
    },
    linkText: {
      marginTop: "25px",
      color: "#666",
      fontSize: "14px",
    },
    link: {
      color: "#6200ee",
      fontWeight: "bold",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bem-vindo</h1>
        <p style={styles.subtitle}>Faça login para continuar</p>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            ENTRAR
          </button>
        </form>

        <p style={styles.linkText}>
          Não tem uma conta?{" "}
          <Link to="/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
