import { useNavigate } from "react-router-dom";

export default function DevPage() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Em desenvolvimento</h2>
        <button onClick={logout}>Sair</button>
      </div>

      <p>Tela em desenvolvimento…</p>
    </div>
  );
}
