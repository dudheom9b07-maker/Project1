import { useEffect, useState } from "react";

function Dashboard(){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editUser,setEditUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fetchUsers = async () => {
        try{
            const res=await fetch("http://localhost:5000/api/auth/users");
            const data = await res.json();
            if(res.ok){
                setUsers(data);
            }else{
                setError(data.message || "Failed to fetch users");
            }
        }catch(err){
            setError("Error fetching users: " + err.message);
        }
}
    useEffect(() => {
        fetchUsers();
    }, []);

    const updateUser = async () => {
  try {
    await fetch(`http://localhost:5000/api/auth/users/${editUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editUser.name,
        email: editUser.email,
      }),
    });

    setEditUser(null);
    fetchUsers();
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = async (id) => {
    const file = selectedFile[id];
    if (!file) return alert("Please select an image first");
    const formData = new FormData();
    formData.append("Image", file);
    await fetch(`http://localhost:5000/api/auth/upload/${id}`, {
      method: "POST",
      body: formData,
    });
    fetchUsers();
  };

    const deleteUser = async (id) => {
        try{
            await fetch(`http://localhost:5000/api/auth/users/${id}`, {
                method: "DELETE",
            });
            fetchUsers();
        }catch(err){
            console.log(err);
        }
    };

    
    return(
        <div style={{padding:20}}>
            <h2>User Dashboard</h2>
            {error && <p style={{color:"red"}}>{error}</p>}
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th>Upload Image</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.profileImage ? (
                                    <img src={`https://localhost:5000/uploads/${user.profileImage}`}
                                     alt="Profile" width="50" height="50" />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setSelectedFile({
                                             ...selectedFile, [user._id]: 
                                             e.target.files[0], })
                                        }                                />
                                        <button onClick={() => uploadImage(user._id)}>Upload Image</button>
                            </td>
                            <td>
                                <button onClick={() => uploadImage(user._id)}>Upload Image</button>
                                <button onClick={() => setEditUser(user)}>Edit</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Dashboard;