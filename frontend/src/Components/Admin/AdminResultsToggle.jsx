import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const AdminResultsToggle = () => {
  const { id } = useParams();
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResultsVisibility = async () => {
      try {
        if (!id) {
          setError("Admin ID not found.");
          return;
        }

        const token = localStorage.getItem('accessToken');
        
        const response = await axios.get(`${server}/admin/results-visibility`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        });
        
        if (response.data.success) {
          setShowResults(response.data.showResults);
        } else {
          setError("Failed to load current settings.");
        }
      } catch (error) {
        console.error("Error fetching results visibility:", error);
        setError("Failed to load current settings: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchResultsVisibility();
  }, [id]);

  const handleToggleResults = async () => {
    try {
      setLoading(true);
      if (!id) {
        setError("Admin ID not found.");
        return;
      }

      const token = localStorage.getItem('accessToken');
      
      const response = await axios.patch(
        `${server}/admin/${id}/toggle-results`,
        { showResults: !showResults },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true,
        }
      );

      if (response.data.success) {
        setShowResults(response.data.showResults);
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update settings.");
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error("Error toggling results visibility:", error);
      setError(error.response?.data?.message || `Failed to update settings: ${error.message}`);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-2/3 mx-auto bg-gray-900 shadow-lg rounded-lg p-8 my-6 border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-white">Election Results Visibility</h2>
        {loading ? (
          <p className="text-gray-400 text-lg">Loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-white text-lg">
                Currently, election results are {" "}
                <span className={showResults ? "text-green-400" : "text-red-400"}>
                  {showResults ? "visible" : "hidden"}
                </span>{" "}
                to voters.
              </p>
              <button
                onClick={handleToggleResults}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-bold text-lg ${
                  showResults ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } transition-colors duration-200`}
                style={{ minWidth: "150px" }}
              >
                {loading ? "Updating..." : showResults ? "Hide Results" : "Show Results"}
              </button>
            </div>
            {message && <div className="mt-6 p-4 bg-green-900 text-green-200 rounded text-lg">{message}</div>}
            {error && <div className="mt-6 p-4 bg-red-900 text-red-200 rounded text-lg">{error}</div>}
            <div className="mt-8 p-6 border border-gray-700 rounded bg-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Note:</h3>
              <p className="text-gray-300 text-lg">
                When results are visible, all voters will be able to see the current vote counts for each candidate. When hidden, only administrators can view the results.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminResultsToggle;