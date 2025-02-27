import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <button
      onClick={() => navigate(-1)} // Go back to the previous page
      className="back-button"
    >
      ← Back
    </button>
  );
};

export default BackButton;
