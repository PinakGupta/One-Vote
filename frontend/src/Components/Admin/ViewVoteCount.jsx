import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ViewVoteCount = () => {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchVoteCounts = async () => {
      if (!id) {
        console.error("Admin ID is undefined.");
        setError("Invalid admin ID.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching data from:", `${server}/admin/${id}/view-count`);

        const response = await axios.get(`${server}/admin/${id}/view-count`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setCandidates(response.data);
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching vote counts:", error);
        setError("Failed to load vote counts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoteCounts();
  }, [id, accessToken]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6" style={{ color: "rgb(84, 18, 238)" }}>
        Candidate Vote Counts
      </h1>

      {loading ? (
        <p className="text-2xl text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-2xl text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-screen-xl overflow-x-auto">
          <table className="w-full bg-gray-900 shadow-xl rounded-3xl border border-gray-700 overflow-hidden">
            <thead>
              <tr style={{ backgroundColor: "rgb(84, 18, 238)" }} className="text-white text-3xl">
                <th className="py-6 px-8">Photo</th>
                <th className="py-6 px-8">Candidate Name</th>
                <th className="py-6 px-8">Party Name</th>
                <th className="py-6 px-8">Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <tr key={candidate.candidateId} className="border-b border-gray-700 hover:bg-gray-800">
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
                  <td colSpan="4" className="py-8 text-center text-3xl text-gray-400">
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

export default ViewVoteCount;
