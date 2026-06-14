import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Items.css";

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get("/items");
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(items);
  return (
    <>
      <Navbar />

      <div className="items-container">

        {items.length === 0 && (
          <div className="empty-state">
            No items found 📦
          </div>
        )}

        <div className="items-title">
          <h1>Lost & Found Items</h1>
        </div>

        <div className="items-grid">

          {items.map((item) => (

            <div
              key={item._id}
              className="item-card"
            >

              {item.image && (
                <img
                  className="item-image"
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.title}
                />
              )}

              <div className="item-content">

                <div className="item-title">
                  {item.title}
                </div>

                <p>{item.description}</p>

                <div className={`item-type ${item.type}`}>
                  {item.type}
                </div>

                <p>📍 {item.location}</p>

                <br />

                <Link
                  className="view-btn"
                  to={`/items/${item._id}`}
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Items;