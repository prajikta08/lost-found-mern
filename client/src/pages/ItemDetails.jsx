import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./ItemDetails.css";

function ItemDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] =
    useState(false);


  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
    checkClaimStatus();
  }, []);

  const fetchItem = async () => {
    try {
      const { data } = await api.get(`/items/${id}`);
      setItem(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        `/items/${id}/claim`,
        { message }
      );

      alert(data.message);
      setAlreadyClaimed(true);
      setMessage("");

    } catch (err) {
      console.error(err);
      alert("Failed to submit claim");
    } finally {
      setLoading(false);
    }
  };
  const checkClaimStatus = async () => {
    try {
      const { data } = await api.get(
        `/items/${id}/my-claim`
      );

      setAlreadyClaimed(data.claimed);

    } catch (err) {
      console.error(err);
    }
  };

if (!item) {
  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="empty-state">
          Loading item...
        </div>
      </div>
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="details-container">

        <div className="details-card">

          {item.image && (
            <img
              className="details-image"
              src={`http://localhost:3000/uploads/${item.image}`}
              alt={item.title}
            />
          )}

          <div className="details-content">

            <h1 className="details-title">
              {item.title}
            </h1>

            <div className="details-badge">
              {item.type}
            </div>

            <p>
              {item.description}
            </p>

            <br />

            <div className="info-row">
              📍 <strong>Location:</strong>
              {" "}
              {item.location}
            </div>

            <div className="info-row">
              🏷️ <strong>Category:</strong>
              {" "}
              {item.category}
            </div>

            <div className="info-row">
              👤 <strong>Owner:</strong>
              {" "}
              {item.owner?.username}
            </div>

            <div className="claim-box">

              <h3>
                Claim This Item
              </h3>

              {alreadyClaimed ? (

                <p>
                  ✅ You already submitted a claim.
                </p>

              ) : (

                <form onSubmit={handleClaim}>

                  <textarea
                    className="claim-textarea"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    placeholder="Explain why this item belongs to you..."
                    required
                  />

                  <button
                    className="claim-btn"
                    type="submit"
                  >
                    Submit Claim
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ItemDetails;