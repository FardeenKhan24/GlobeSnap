import React from "react";
import axios from "axios";
import "./EditModal.css"

const EditModal = ({ id, editForm, setEditForm, setEditModal, setEntry ,setActionLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("location", editForm.location);
    formData.append("description", editForm.description);
    formData.append("date", editForm.date);

    for (let i = 0; i < editForm.images.length; i++) {
      formData.append("images", editForm.images[i]);
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/journals/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setEntry(res.data.journal);
      setEditModal(false);
      setActionLoading(false)
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit {editForm.title}</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={editForm.location}
            onChange={(e) =>
              setEditForm({ ...editForm, location: e.target.value })
            }
            placeholder="Location"
            required
          />
          <input
            type="date"
            value={editForm.date}
            onChange={(e) =>
              setEditForm({ ...editForm, date: e.target.value })
            }
            required
          />
          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            placeholder="Description (min 50 chars)"
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setEditForm({ ...editForm, images: e.target.files })
            }
          />

          <div className="modal-buttons">
            <button type="submit" className="yes">
              Save
            </button>
            <button
              type="button"
              className="no"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
