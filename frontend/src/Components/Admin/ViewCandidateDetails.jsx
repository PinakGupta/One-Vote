import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../axiosInstance";
import { server } from "../../server";
import { format } from "date-fns";

function ViewCandidateDetails() {
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { adminId, electionId, candidateId } = useParams();

    useEffect(() => {
        fetchCandidateDetails();
    }, [candidateId]);

    const fetchCandidateDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            const response = await api.get(
                `${server}/candidates/candidate-list/${adminId}/${electionId}/candidate/${candidateId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCandidate(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch candidate details");
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "MMMM dd, yyyy");
        } catch (e) {
            return "Invalid date";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-[#0099ff] text-xl">Loading candidate details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="bg-red-900 border-2 border-red-600 text-red-200 px-6 py-4 rounded-lg mb-8 animate-pulse text-lg max-w-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-white text-xl">Candidate not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Candidate Details</h1>
                    <Link
                        to={`/admin/${adminId}/election/${electionId}/view-candidates`}
                        className="inline-block px-8 py-3 border-2 border-[#0099ff] text-[#0099ff] rounded-lg text-lg font-medium hover:bg-[#0099ff] hover:text-white transition-colors"
                    >
                        &lt; Back to Candidates
                    </Link>
                </div>

                <div className="bg-[#121212] rounded-xl p-8 shadow-lg" style={{ boxShadow: "0 0 40px rgba(88, 88, 255, 0.15)" }}>
                    {/* Header with profile */}
                    <div className="flex items-center gap-8 mb-10 border-b border-[#333333] pb-10">
                        <div className="w-40 h-40 rounded-full overflow-hidden bg-[#252525] flex-shrink-0 border-4 border-[#0099ff]">
                            <img
                                src={candidate.avatar || "https://via.placeholder.com/150"}
                                alt={candidate.firstName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                {candidate.firstName} {candidate.lastName}
                            </h2>
                            <p className="text-xl text-gray-400">
                                <span className="bg-[#5800FF] text-white px-4 py-1 rounded-full text-sm mr-3">
                                    {candidate.candidateType}
                                </span>
                                Representative of {candidate.representative}
                            </p>
                        </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-5">
                            <h3 className="text-xl font-semibold text-[#0099ff]">Personal Information</h3>
                            
                            <div>
                                <p className="text-gray-400 text-sm">Date of Birth</p>
                                <p className="text-lg">{formatDate(candidate.dob)}</p>
                            </div>
                            
                            <div>
                                <p className="text-gray-400 text-sm">Voter ID</p>
                                <p className="text-lg">{candidate.voterId}</p>
                            </div>
                            
                            <div>
                                <p className="text-gray-400 text-sm">Unique ID</p>
                                <p className="text-lg">{candidate.uniqueId}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-5">
                            <h3 className="text-xl font-semibold text-[#0099ff]">Electoral Information</h3>
                            
                            <div>
                                <p className="text-gray-400 text-sm">Location</p>
                                <p className="text-lg">{candidate.town}</p>
                            </div>
                            
                        </div>
                    </div>

                    {/* Promises section */}
                    <div>
                        <h3 className="text-xl font-semibold text-[#0099ff] mb-5">Campaign Promises</h3>
                        
                        <div className="bg-[#1a1a1a] rounded-lg p-6 max-h-96 overflow-y-auto">
                            {candidate.promise && candidate.promise.length > 0 ? (
                                <ul className="space-y-4">
                                    {candidate.promise.map((promise, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="text-[#0099ff] font-bold">•</span>
                                            <span className="text-gray-300">{promise}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No promises recorded for this candidate.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCandidateDetails;