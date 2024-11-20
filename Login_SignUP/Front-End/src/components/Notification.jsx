// Notification.js
import React, { useEffect, useState } from "react";
import "./Notification.css";

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setVisible(true);

    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 500); // Delay for smooth exit
    }, 3000);

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [onClose]);

  return (
    <div className={`notification ${type} ${visible ? "show" : ""}`}>
      <span>{message}</span>
      <button
        className="close-btn"
        onClick={() => setVisible(false) || onClose()}
      >
        &times;
      </button>
      {/* Add sliding progress bar */}
      <div className="progress-bar"></div>
    </div>
  );
}

export default Notification;
