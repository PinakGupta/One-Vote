import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../server.js";

const UserVoteResults = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultsVisible, setResultsVisible] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkResultsVisibility = async () => {
      try {
        const response = await axios.get(`${server}/admin/results-visibility`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        console.log(response)
        setResultsVisible(response.data.showResults);

        if (response.data.showResults) {
          fetchVoteCounts();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking results visibility:", error);
        setError("Failed to check if results are available.");
        setLoading(false);
      }
    };

    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get(`${server}/admin/view-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setCandidates(response.data);
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching vote counts:", error);
        if (error.response && error.response.status === 403) {
          setResultsVisible(false);
        } else {
          setError("Failed to load vote counts. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkResultsVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!resultsVisible) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: "rgb(84, 18, 238)" }}
          >
            Results Not Available
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            The election results have not been released yet.
          </p>
          <p className="text-gray-400">
            Please check back later. The election administrator will make the
            results public when the voting period has ended.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1
        className="text-4xl font-bold mb-6"
        style={{ color: "rgb(84, 18, 238)" }}
      >
        Election Results
      </h1>

      {loading ? (
        <p className="text-2xl text-gray-400">Loading results...</p>
      ) : error ? (
        <p className="text-2xl text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-screen-xl overflow-x-auto">
          <table className="w-full bg-gray-900 shadow-xl rounded-3xl border border-gray-700 overflow-hidden">
            <thead>
              <tr
                style={{ backgroundColor: "rgb(84, 18, 238)" }}
                className="text-white text-3xl"
              >
                <th className="py-6 px-8">Photo</th>
                <th className="py-6 px-8">Candidate Name</th>
                <th className="py-6 px-8">Party Name</th>
                <th className="py-6 px-8">Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <tr
                    key={candidate.candidateId}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="py-6 px-8 text-center">
                      {candidate.photoUrl ? (
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.candidateName}
                          className="w-32 h-32 rounded-full mx-auto border-4 shadow-lg"
                          style={{ borderColor: "rgb(84, 18, 238)" }}
                        />
                      ) : (
                        <span className="text-xl text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="py-6 px-8 text-center text-3xl font-bold text-white">
                      {candidate.candidateName}
                    </td>
                    <td
                      className="py-6 px-8 text-center text-3xl font-bold"
                      style={{ color: "rgb(84, 18, 238)" }}
                    >
                      {candidate.partyName}
                    </td>
                    <td
                      className="py-6 px-8 text-center text-3xl font-bold"
                      style={{ color: "rgb(84, 18, 238)" }}
                    >
                      {candidate.voteCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-8 text-center text-3xl text-gray-400"
                  >
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserVoteResults;
