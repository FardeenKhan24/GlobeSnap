import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import "./Navbar.css";
import { MdTravelExplore } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [ham, setHam] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (ham) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [ham]);

  return (
    <>
      <div className="navbar-container">
        <div className="nav-title">
          <div className="ham" onClick={() => setHam(!ham)}>
            {ham ? <IoMdClose /> : <GiHamburgerMenu />}
          </div>
          <Link to="/">
            <MdTravelExplore className="navbar-icons" />
          </Link>
          <h2>GlobeSnap</h2>
        </div>

        <div className={`nav-links ${ham ? "show" : ""}`}>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => setHam(false)}
                className={location.pathname === "/" ? "active-link" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setHam(false)}
                className={location.pathname === "/about" ? "active-link" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                onClick={() => setHam(false)}
                className={location.pathname === "/create" ? "active-link" : ""}
              >
                Create
              </Link>
            </li>
          </ul>
        </div>

        {user.token && user.user ? (
          <div className="navbar-user" onClick={() => setShowDropdown(!showDropdown)}>
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.user.username}`}
              alt="avatar"
              className="navbar-avatar"
            />
            <span className="navbar-username">{user.user.username}</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      {showLogoutModal && (
        <div className="modal-overlays">
          <div className="modal-boxes">
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="yes" onClick={confirmLogout}>
                Yes
              </button>
              <button className="no" onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
