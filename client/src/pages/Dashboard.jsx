import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const fetchProfile =
            async () => {

                try {

                    const res =
                        await api.get(
                            "/profile"
                        );

                    setUser(
                        res.data
                    );

                } catch (err) {

                    console.log(err);

                }

            };

        fetchProfile();

    }, []);

    if (!user) {
    return (
        <>
            <Navbar />

            <div className="dashboard-container">
                <div className="empty-state">
                    Loading dashboard...
                </div>
            </div>
        </>
    );
}

    return (

        <>
            <Navbar />
            <div className="dashboard-container">

                <div className="welcome-card">

                    <div className="quick-actions">

                        <Link
                            to="/create-item"
                            className="action-btn"
                        >
                            ➕ Report Item
                        </Link>

                        <Link
                            to="/items"
                            className="action-btn"
                        >
                            📦 View Items
                        </Link>

                    </div>

                    <h1>
                        👋 Welcome back,
                        {" "}
                        {user.username}
                    </h1>

                    <p>
                        {user.email}
                    </p>

                    <p>
                        Manage your lost and found items
                    </p>

                </div>

                <div className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-number">
                            {user.lostItems.length}
                        </div>

                        <div className="stat-title">
                            My Items
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-number">
                            🚀
                        </div>

                        <div className="stat-title">
                            Claims
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-number">
                            🔍
                        </div>

                        <div className="stat-title">
                            Resolved
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default Dashboard;