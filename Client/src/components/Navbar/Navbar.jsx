import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import "./Navbar.css";
import { MdTravelExplore } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ham, setHam] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 


  const handleLogout = () => {
  dispatch(logout());
  navigate("/login");
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
            {ham ? <IoIosClose /> : <GiHamburgerMenu />}
          </div>
          <Link to="/">
            <MdTravelExplore className="navbar-icons" />
          </Link>
          <h2>GlobeSnap</h2>
        </div>

        <div className={`nav-links ${ham ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setHam(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setHam(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={() => setHam(false)}>
                Create
              </Link>
            </li>
          </ul>
        </div>

        { user.token && user.user ? (
          <div className="navbar-user">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.user.username}`}
              alt="avatar"
              className="navbar-avatar"
              onClick={() => setShowDropdown(!showDropdown)} // 👈 toggle dropdown
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
    </>
  );
};

export default Navbar;
