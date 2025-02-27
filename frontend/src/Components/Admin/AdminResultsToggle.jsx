// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { server } from "../../server";

// const AdminResultsToggle = () => {
//   const [showResults, setShowResults] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   // Get token from cookie or localStorage
//   const getAuthToken = () => {
//     // Your app uses cookies for authentication, but we'll include both methods
//     return localStorage.getItem("accessToken") || "";
//   };

//   useEffect(() => {
//     const fetchResultsVisibility = async () => {
//       try {
//         const response = await axios.get(`${server}/admin/results-visibility`);
//         if (response.data.success) {
//           setShowResults(response.data.showResults);
//         } else {
//           setError("Failed to load current settings.");
//         }
//       } catch (error) {
//         console.error("Error fetching results visibility:", error);
//         setError("Failed to load current settings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResultsVisibility();
//   }, []);

//   const handleToggleResults = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.patch(
//         `${server}/admin/toggle-results`,
//         { showResults: !showResults },
//         {
//           headers: {
//             Authorization: `Bearer ${getAuthToken()}`,
//           },
//           withCredentials: true, // Include cookies if your API uses them
//         }
//       );

//       if (response.data.success) {
//         setShowResults(response.data.showResults);
//         setMessage(response.data.message);
        
//         // Clear message after 3 seconds
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setError("Failed to update settings.");
//         setTimeout(() => setError(null), 3000);
//       }
//     } catch (error) {
//       console.error("Error toggling results visibility:", error);
//       setError(error.response?.data?.message || "Failed to update settings.");
      
//       // Clear error after 3 seconds
//       setTimeout(() => setError(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg p-6 my-4 border border-gray-700">
//       <h2 className="text-2xl font-bold mb-4 text-white">Election Results Visibility</h2>
      
//       {loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <p className="text-white">
//               Currently, election results are{" "}
//               <span className={showResults ? "text-green-400" : "text-red-400"}>
//                 {showResults ? "visible" : "hidden"}
//               </span>{" "}
//               to voters.
//             </p>
            
//             <button
//               onClick={handleToggleResults}
//               disabled={loading}
//               className={`px-4 py-2 rounded-lg font-bold ${
//                 showResults
//                   ? "bg-red-600 hover:bg-red-700"
//                   : "bg-green-600 hover:bg-green-700"
//               } transition-colors duration-200`}
//               style={{ minWidth: "120px" }}
//             >
//               {loading ? "Updating..." : showResults ? "Hide Results" : "Show Results"}
//             </button>
//           </div>
          
//           {message && (
//             <div className="mt-4 p-2 bg-green-900 text-green-200 rounded">
//               {message}
//             </div>
//           )}
          
//           {error && (
//             <div className="mt-4 p-2 bg-red-900 text-red-200 rounded">
//               {error}
//             </div>
//           )}
          
//           <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800">
//             <h3 className="text-lg font-semibold mb-2 text-white">Note:</h3>
//             <p className="text-gray-300">
//               When results are visible, all voters will be able to see the current vote counts for each candidate. When hidden, only administrators can view the results.
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

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

  const getAuthToken = () => localStorage.getItem("accessToken") || "";

  useEffect(() => {
    const fetchResultsVisibility = async () => {
      try {
        if (!id) {
          setError("Admin ID not found.");
          return;
        }

        const response = await axios.get(`${server}/admin/${id}/results-visibility`);
        if (response.data.success) {
          setShowResults(response.data.showResults);
        } else {
          setError("Failed to load current settings.");
        }
      } catch (error) {
        console.error("Error fetching results visibility:", error);
        setError("Failed to load current settings.");
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

      const response = await axios.patch(
        `${server}/admin/${id}/toggle-results`,
        { showResults: !showResults },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
          withCredentials: true,
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
      setError(error.response?.data?.message || "Failed to update settings.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg p-6 my-4 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Election Results Visibility</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-white">
              Currently, election results are {" "}
              <span className={showResults ? "text-green-400" : "text-red-400"}>
                {showResults ? "visible" : "hidden"}
              </span>{" "}
              to voters.
            </p>
            <button
              onClick={handleToggleResults}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-bold ${
                showResults ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              } transition-colors duration-200`}
              style={{ minWidth: "120px" }}
            >
              {loading ? "Updating..." : showResults ? "Hide Results" : "Show Results"}
            </button>
          </div>
          {message && <div className="mt-4 p-2 bg-green-900 text-green-200 rounded">{message}</div>}
          {error && <div className="mt-4 p-2 bg-red-900 text-red-200 rounded">{error}</div>}
          <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-white">Note:</h3>
            <p className="text-gray-300">
              When results are visible, all voters will be able to see the current vote counts for each candidate. When hidden, only administrators can view the results.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminResultsToggle;
