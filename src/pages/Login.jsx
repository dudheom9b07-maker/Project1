import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (!storedUserData) {
      setError("No user found with this email.");
      return;
    }
    if (storedUserData.email === email && password === storedUserData.password) {
      onLogin(storedUserData);
    } else {
      setError("Invalid email or password.");
    }
  };
    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
    );
}
export default Login;