import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      Page NotFound
      <button
        style={{ backgroundColor: "red", padding: "10px 15px", color: "white" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Goback
      </button>
    </div>
  );
};

export default NotFound;
