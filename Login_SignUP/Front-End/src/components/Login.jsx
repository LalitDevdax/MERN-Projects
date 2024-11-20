// Login.js
import React, { useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import "./Form.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false, 
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      console.log(response.data);
      setNotification({
        message: "Login successful!",
        type: "success",
        visible: true,
      });
    } catch (error) {
      setNotification({
        message: "Invalid username or password.",
        type: "warn",
        visible: true,
      });
    }
    setFormData({ username: "", password: "" });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Close notification handler
  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="switch-form">
        Don't have an account <Link to="/register">Register Now</Link>
      </p>
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default Login;
