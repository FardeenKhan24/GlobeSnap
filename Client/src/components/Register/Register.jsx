import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice"; 
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setMsg("")

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        form
      );

      const user = res.data.user;
      const token = res.data.token;

      dispatch(setUser({ user, token })); 
      navigate("/"); 
    } catch (error) {
        setMsg(error.response?.data?.message || "Register failed")      
    } finally{
      setIsLoading(false)
    }
  };

 return (
  <div className="register-container">
    <div className="register-container1">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-bar">
            <div></div><div></div><div></div><div></div><div></div>
          </div>
          <p>Registering...</p>
        </div>
      ) : (
        <>
          <h2>Register to GlobeSnap</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
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
            <button type="submit">Register</button>
          </form>

          {msg && <p className="error-message">{msg}</p>}

          <p>
            <Link to="/login">Already registered</Link>
          </p>
        </>
      )}
    </div>
  </div>
);
}

export default Register;
