import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, senha });

      // backend: { success: true, message: { message: { token: "..." } } }
      const token =
        res.data?.message?.message?.token ||
        res.data?.message?.token ||
        res.data?.token;

      if (!token) {
        setErro("Token não retornou no login.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/app");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Falha ao fazer login.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 360,
          maxWidth: "100%",
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 12,
          display: "grid",
          gap: 12,
          background: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>Login</h2>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="seu@email.com"
            required
            style={{ padding: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Senha</span>
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            placeholder="******"
            required
            style={{ padding: 8 }}
          />
        </label>

        {erro && <div style={{ color: "crimson", fontSize: 14 }}>{erro}</div>}

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
