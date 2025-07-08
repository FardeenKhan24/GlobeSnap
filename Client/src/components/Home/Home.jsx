import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Landing from "../../assets/Landing1.jpg";
import No from "../../assets/No.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  const [journals, setJournals] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const exploreRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/journals", {
          withCredentials: true,
        });
        setJournals(res.data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    if (user) {
      fetchJournals();
    }
  }, [user]);

  const filtered = journals.filter(
    (j) =>
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.date.startsWith(search)
  );

  const handleExploreClick = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="landing-card">
          <img src={Landing} alt="Landing" />
          <div className="landing-card-content">
            <h2>Welcome to GlobeSnap</h2>
            <p>Discover and track your travel memories!</p>
            <div className="navbar-route">
              <span className="start-icon">🛫</span>
              <svg
                className="route-svg"
                viewBox="0 0 500 50"
                preserveAspectRatio="none"
              >
                <path d="M 0 25 Q 250 0, 500 25" className="route-path" />
              </svg>
              <span className="end-icon">📍</span>
            </div>
            <div className="land-btn">
              <button onClick={handleExploreClick}>Explore Memories</button>
              <button onClick={() => navigate("/create")}>
                Create Your Memories
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="explore" ref={exploreRef}>
        <h1>Explore</h1>
        <input
          type="text"
          placeholder="Search by places or dates(yy-mm-dd)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="destinations-container">
  {!user ? (
    <div className="no-journals">
      <Link to="/login">Login to See Your Travel Memories</Link>
    </div>
  ) : filtered.length > 0 ? (
    filtered.map((journal) => (
      <div className="city-card" key={journal._id}>
        <div className="city-image-wrapper">
          <img
            src={journal.images[0]?.url}
            alt={journal.title}
            className="city-image"
          />
        </div>
        <div className="city-content">
          <h3 className="city-title">{journal.title}</h3>
          <p><strong>Date:</strong> {journal.date}</p>
          <p><strong>Location:</strong> {journal.location}</p>
          <p className="city-description">{journal.description}</p>
          <Link to={`/view/${journal._id}`}>
            <button>Read More</button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <div className="no-journals">
      <img src={No} alt="No entries found" />
      <Link to="/create">Document Your First Travel Story</Link>
    </div>
  )}
</div>


      <Reviews />
    </>
  );
};

export default Home;
