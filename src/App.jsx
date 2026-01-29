import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ApiDemo from './pages/ApiDemo.jsx'   // ✅ FIXED PATH

function App() {
  const [page, setPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // session restore on refresh
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, []);

  return (
    <div>
      {page === "landing" && <Landing onNavigate={setPage} />}

      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "api" && <ApiDemo />}

      {page === "register" && (
        <Registration onRegisterSuccessful={() => setPage("login")} />
      )}

      {page === "login" && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
            setPage("dashboard");
          }}
        />
      )}

      {/* Protected Dashboard */}
      {page === "dashboard" && (
        isLoggedIn ? (
          <Dashboard
            onLogout={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("user");
              setPage("login");
            }}
          />
        ) : (
          <Login
            onLogin={() => {
              setIsLoggedIn(true);
              localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
              setPage("dashboard");
            }}
          />
        )
      )}

      <button onClick={() => setPage("api")}>ApiDemo</button>
      
    </div>
  );
}

export default App;