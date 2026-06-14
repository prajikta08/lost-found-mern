import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/register", {
        username,
        email,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-title">
          <h1>Lost & Found</h1>

          <p>
            Create your account ✨
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="auth-group">
            <input
              className="auth-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />
          </div>

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
            Register
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;