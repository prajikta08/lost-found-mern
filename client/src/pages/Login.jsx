import { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [email, setEmail] =
    useState("");

    const [password, setPassword] =
    useState("");

    const navigate = useNavigate();

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const res =
await api.post(
    "/login",
    {
        email,
        password
    }
);

localStorage.setItem(
    "token",
    res.data.token
);

navigate("/dashboard");

        } catch(err) {

    console.log("FULL ERROR:", err);

    if(err.response){
        console.log(err.response.data);
        alert(err.response.data.message || "Login Failed");
    }
    else{
        alert("Network Error");
    }
}
    };

    return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="auth-title">
        <h1>Lost & Found</h1>

        <p>
          Welcome back 👋
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="auth-group">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div className="auth-group">
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <button
          className="auth-btn"
          type="submit"
        >
          Login
        </button>

      </form>

      <div className="auth-footer">
        New here?{" "}
        <Link to="/register">
          Register
        </Link>
      </div>

    </div>

  </div>
);
}

export default Login;