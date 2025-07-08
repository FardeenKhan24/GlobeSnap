import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        form,
        { withCredentials: true }
      );
      const user = res.data.user
      const token = res.data.token
      dispatch(setUser({user,token}));
      navigate("/")
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container1">
          <h2>Login to GlobeSnap</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">
              Login
            </button>
          </form>
          <p>
            <Link to="/register">Do not have an account?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
