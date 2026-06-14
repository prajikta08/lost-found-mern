import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Lost & Found
      </div>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/items">
          Items
        </Link>

        <Link to="/create-item">
          Report Item
        </Link>

        <Link to="/claims">
          Claims
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;