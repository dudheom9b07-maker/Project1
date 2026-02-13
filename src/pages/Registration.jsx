import { useState } from "react";

function Registration({onRegisterSuccesful}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration Successful!");
        // clear form
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        setTimeout(() => {
          onRegisterSuccesful();
        }, 2000);
      } else {
        setMessage(data.message || "Registration failed");
        setLoading(false);
      }
  } catch (err) {
    console.error(err);
    setMessage("Server error");
    setLoading(false);
  }
  };




  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Register</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}

export default Registration;