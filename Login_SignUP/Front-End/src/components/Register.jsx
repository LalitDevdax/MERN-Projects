// Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Notification from "./Notification";
import "./Form.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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
        "http://localhost:8000/register",
        formData
      );
      console.log(response.data);
      setNotification({
        message: "Registration successful!",
        type: "success",
        visible: true,
      });
    } catch (error) {
      setNotification({
        message: "Failed to register. Please try again.",
        type: "warn",
        visible: true,
      });
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Close notification handler
  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
          Register
        </button>
      </form>
      <p className="switch-form">
        Already have an account? <Link to="/login">Login Now</Link>
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

export default Register;
