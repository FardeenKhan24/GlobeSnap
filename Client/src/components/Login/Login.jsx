import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        form
      );

      const user = res.data.user;
      const token = res.data.token;

      dispatch(setUser({ user, token }));
      navigate("/");
    } catch (error) {
      setMsg(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container1">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-bar">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p>Logging in...</p>
          </div>
        ) : (
          <>
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
              <button type="submit">Login</button>
            </form>

            {msg && <p className="error-message">{msg}</p>}

            <p>
              <Link to="/register">Do not have an account?</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
