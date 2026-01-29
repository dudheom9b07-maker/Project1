import { useState } from "react";

function Registration({onRegisterSuccesful}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    //Storing data locally here
    const userData = {
      name,
      email,
      password,
     };

     localStorage.setItem("userData", JSON.stringify(userData));
    // for now just showing success
    setMessage("Registration successful ✅");

    // clear form
    setName("om");
    setEmail("admin@gmail.com");
    setPassword("123456");
  

  setTimeout(() => {
  onRegisterSuccesful();  
  },2000);
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;