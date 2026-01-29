function Dashboard({onLogout}) {
    return (
        <div style={{padding:"20px"}}>
            <h1>Welcome user !</h1>
            <p>you are logged in</p>
            <button onClick={onLogout} style={{marginTop:"20px"}}>Logout</button>
        </div>
    )
}
export default Dashboard;