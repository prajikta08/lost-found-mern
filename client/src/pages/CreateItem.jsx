import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./CreateItem.css";

function CreateItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("lost");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("type", type);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Item created successfully");

      navigate("/items");

    } catch (err) {
      console.error(err);

      console.log("Response:", err.response);

      alert(
        err.response?.data ||
        err.message ||
        "Failed to create item"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-container">

        <div className="create-card">

          <div className="create-title">
            <h1>📦 Report Lost / Found Item</h1>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Title</label>

              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                className="form-control"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                className="form-control"
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                className="form-control"
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Type</label>

              <select
                className="form-control"
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >
                <option value="lost">
                  Lost
                </option>

                <option value="found">
                  Found
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image</label>

              <input
                className="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />
            </div>

            <button
              type="submit"
              className="create-btn"
            >
              Create Item
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateItem;