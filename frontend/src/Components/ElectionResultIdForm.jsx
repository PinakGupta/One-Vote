// Components/ElectionResultIdForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../context.js";

function ElectionResultIdForm() {
  const [electionId, setElectionId] = useState("");
  const { visitorId } = useContext(userContext); // Get visitorId from context
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL params

  const handleSubmit = (e) => {
    e.preventDefault();
    if (electionId.trim()) {
      // Navigate to UserVoteResults with visitorId and electionId
      navigate(`/${visitorId}/declare-result`);
    } else {
      alert("Please enter a valid Election ID");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#333333",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#ffffff",
        }}
      >
        Enter the Election ID to View Results
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="electionId"
            style={{
              fontSize: "1.5rem", // Larger label text
              display: "block",
              marginBottom: "10px",
              color: "#ffffff", // White text
            }}
          >
            Election ID:
          </label>
          <input
            type="text"
            id="electionId"
            value={electionId}
            onChange={(e) => setElectionId(e.target.value)}
            placeholder="Enter Election ID"
            style={{
              width: "100%",
              padding: "15px", // Larger input padding
              fontSize: "1.25rem", // Larger input text
              margin: "15px 0",
              border: "2px solid #007bff",
              borderRadius: "6px",
              boxSizing: "border-box",
              backgroundColor: "#444444", // Slightly lighter dark background for input
              color: "#ffffff", // White text for input
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "15px 30px", // Bigger button
            fontSize: "1.25rem", // Bigger button text
            backgroundColor: "#007bff",
            color: "#ffffff", // White text
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ElectionResultIdForm;