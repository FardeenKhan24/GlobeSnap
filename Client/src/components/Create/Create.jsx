import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);

  if (selectedFiles.length > 5) {
    setError("You can upload up to 5 images only.");
    return;
  }

  setImages(selectedFiles);
  setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true)

    const { title, location, description, date } = form;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("date", date);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/journals`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true,
      });

      setIsLoading(false)
      alert(`${location} memories created!`);
      navigate("/");

      setForm({ title: "", location: "", description: "", date: "" });
      setImages([]);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create journal entry");
      }
      setIsLoading(false)
    }
  };

return (
  <div className="laptop-wrapper">
    <div className="laptop-screen">
      <div className="create-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-bar">
              <div></div><div></div><div></div><div></div><div></div>
            </div>
            <p>Uploading...</p>
          </div>
        ) : (
          <>
            <h2>Add a Travel Story</h2>
            <form onSubmit={handleSubmit} className="create-form">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />
              <label>Select Date of Travel:</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Write your experience (min 50 characters)"
                rows="5"
                value={form.description}
                onChange={handleChange}
              />
              <label>Upload Images (Max 5):</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <small style={{ color: "gray" }}>Supported formats: JPG, PNG, JPEG, WEBP</small>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="create-btn" disabled={isLoading}>
                Create
              </button>
            </form>
          </>
        )}
      </div>
    </div>
    <div className="laptop-base"></div>
  </div>
);
}

export default Create;
