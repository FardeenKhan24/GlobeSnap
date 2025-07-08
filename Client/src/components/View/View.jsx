import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import EditModal from "../EditModal/EditModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./View.css";

const View = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    images: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const confirmDelete = () => setShowModal(true);
  const cancelDelete = () => setShowModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/journals`, {
          withCredentials: true,
        });
        const singleEntry = res.data.find((j) => j._id === id);
        setEntry(singleEntry);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };
    fetchEntry();
  }, [id]);

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/journals/${id}`, {
        withCredentials: true,
      });
      setActionLoading(false)
      navigate("/");
    } catch (error) {
      console.error("Error deleting entry:", error);
      setActionLoading(false)
    }
  };

  if (!entry) return <div>Loading...</div>;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? entry.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === entry.images.length - 1 ? 0 : prev + 1
    );
  };

  if (actionLoading) {
  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div></div><div></div><div></div><div></div><div></div>
      </div>
      <p>Processing...</p>
    </div>
  );
}

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="loading-bar">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="view-container">
            <h2 className="view-title">{entry.title}</h2>
            <div className="date">
              <BsCalendarDateFill />
              <p>{entry.date}</p>
            </div>
            <div className="date">
              <FaMapLocationDot />
              <p>{entry.location}</p>
            </div>
          </div>

          {entry.images.length > 0 && (
            <div className="view-img">
              <div className="carousel">
                <button onClick={handlePrev}>&lt;</button>
                <img
                  src={entry.images[currentIndex]?.url}
                  alt="memory"
                />
                <button onClick={handleNext}>&gt;</button>
              </div>
              <div className="desc-del">
                <p>"{entry.description}"</p>
                <div className="del-edit">
                  <div
                    className="delete"
                    onClick={() => {
                      setEditModal(true);
                      setEditForm({
                        title: entry.title,
                        location: entry.location,
                        description: entry.description,
                        date: entry.date,
                        images: [],
                      });
                    }}
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </div>
                  <div className="delete" onClick={confirmDelete}>
                    <MdDelete />
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {editModal && (
            <EditModal
              id={id}
              editForm={editForm}
              setEditForm={setEditForm}
              setEditModal={setEditModal}
              setEntry={setEntry}
              setActionLoading={setActionLoading}
            />
          )}

          {showModal && (
            <div className="modal-overlays">
              <div className="modal-boxes">
                <p>
                  Are you sure you want to delete this{" "}
                  <strong>{entry.location}</strong> memories?
                </p>
                <div className="modal-buttons">
                  <button className="yes" onClick={handleDelete}>
                    Yes
                  </button>
                  <button className="no" onClick={cancelDelete}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default View;
