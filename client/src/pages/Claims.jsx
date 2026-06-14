import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Claims.css";

function Claims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const { data } = await api.get("/claims");
      setClaims(data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveClaim = async (id) => {
    try {
      await api.post(`/claims/${id}/approve`);

      fetchClaims();

    } catch (err) {
      console.error(err);
    }
  };

  const rejectClaim = async (id) => {
    try {
      await api.post(`/claims/${id}/reject`);

      fetchClaims();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="claims-container">

        <div className="claims-title">
          <h1>Claims</h1>
        </div>

        <div className="claim-grid">
          {claims.length === 0 && (
            <div className="empty-state">
              No claims yet 🤝
            </div>
          )}

          {claims.map((claim) => (

            <div
              key={claim._id}
              className="claim-card"
            >

              <div className="claim-item">
                {claim.item?.title}
              </div>

              <p>
                <strong>Claimant:</strong>{" "}
                {claim.claimant?.username}
              </p>

              <p>
                <strong>Message:</strong>{" "}
                {claim.message}
              </p>

              <div
                className={`claim-status ${claim.status}`}
              >
                {claim.status}
              </div>

              {claim.status === "pending" && (
                <div className="btn-group">

                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveClaim(claim._id)
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      rejectClaim(claim._id)
                    }
                  >
                    Reject
                  </button>


                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Claims;