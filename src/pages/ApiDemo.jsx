import { useEffect, useState } from "react";

function Apidemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Data Fetching Demo</h2>

      {loading && <p>Loading data...</p>}

      {!loading &&
        users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
          >
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
    </div>
  );
}

export default Apidemo;