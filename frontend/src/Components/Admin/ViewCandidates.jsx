// // import React, { useContext, useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import api from "../../axiosInstance";
// // import { server } from "../../server";
// // import { userContext } from "../../context";
// // import "../../Styles/CandidateList.css";

// // function ViewCandidates() {
// //     const { visitorType } = useContext(userContext);
// //     const [candidates, setCandidates] = useState([]);
// //     const [error, setError] = useState("");
// //     const { id } = useParams(); // Extracting id from URL parameters

// //     useEffect(() => {
// //         if (id) {
// //             fetchCandidates();
// //         }
// //     }, [id]); // Re-run effect if id changes

// //     const fetchCandidates = async () => {
// //         try {
// //             const token = localStorage.getItem("accessToken");
// //             const response = await api.get(`${server}/candidates/candidate-list`, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //             });
// //             setCandidates(response.data.data);
// //         } catch (err) {
// //             setError(err.response?.data?.message || "Failed to fetch candidates");
// //         }
// //     };

// //     useEffect(() => {
// //         if (error) {
// //             const timer = setTimeout(() => setError(""), 3000);
// //             return () => clearTimeout(timer);
// //         }
// //     }, [error]);

// //     return (
// //         <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
// //             <div className="max-w-7xl mx-auto">
// //                 <h1 className="text-3xl font-bold mb-4">View Candidates</h1>
// //                 <p className="text-gray-400 mb-6">Browse the list of registered candidates.</p>

// //                 <Link
// //                     to={`/admin/${id}`}
// //                     state={{ visitorType }}
// //                     className="inline-block px-6 py-2 mb-8 border border-[#0099ff] text-[#0099ff] rounded hover:bg-[#0099ff] hover:text-white transition-colors"
// //                 >
// //                     &lt; Back
// //                 </Link>

// //                 {error && (
// //                     <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
// //                         {error}
// //                     </div>
// //                 )}

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {candidates.length === 0 ? (
// //                         <p className="text-gray-400">No candidates registered yet</p>
// //                     ) : (
// //                         candidates.map((candidate) => (
// //                             <div
// //                                 key={candidate._id}
// //                                 className="relative bg-[#121212] rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
// //                                 style={{ boxShadow: "0 0 20px rgba(88, 88, 255, 0.2)" }}
// //                             >
// //                                 <div className="flex flex-col items-center gap-4">
// //                                     <div className="w-48 h-48 rounded-lg overflow-hidden">
// //                                         <img
// //                                             src={candidate.avatar}
// //                                             alt={candidate.firstName}
// //                                             className="w-full h-full object-cover"
// //                                         />
// //                                     </div>
// //                                     <h3 className="text-xl font-bold text-center">
// //                                         {candidate.firstName} {candidate.lastName}
// //                                     </h3>
// //                                     <p className="text-gray-400 text-sm">{candidate.partyName}</p>
// //                                 </div>
// //                             </div>
// //                         ))
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default ViewCandidates;
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import api from "../../axiosInstance";
// import { server } from "../../server";
// import { userContext } from "../../context";
// import "../../Styles/CandidateList.css";

// function ViewCandidates() {
//     const { visitorType } = useContext(userContext);
//     const [candidates, setCandidates] = useState([]);
//     const [error, setError] = useState("");
//     const { id } = useParams(); // Extracting election ID from URL
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (id) {
//             fetchCandidates();
//         }
//     }, [id]);

//     const fetchCandidates = async () => {
//         try {
//             const token = localStorage.getItem("accessToken");
//             const response = await api.get(`${server}/candidates/candidate-list`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setCandidates(response.data.data);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch candidates");
//         }
//     };

//     useEffect(() => {
//         if (error) {
//             const timer = setTimeout(() => setError(""), 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [error]);

//     return (
//         <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold mb-4">View Candidates</h1>
//                 <p className="text-gray-400 mb-6">Browse the list of registered candidates.</p>

//                 <Link
//                     to={`/admin/${id}`}
//                     state={{ visitorType }}
//                     className="inline-block px-6 py-2 mb-8 border border-[#0099ff] text-[#0099ff] rounded hover:bg-[#0099ff] hover:text-white transition-colors"
//                 >
//                     &lt; Back
//                 </Link>

//                 {error && (
//                     <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
//                         {error}
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {candidates.length === 0 ? (
//                         <p className="text-gray-400">No candidates registered yet</p>
//                     ) : (
//                         candidates.map((candidate) => (
//                             <div
//                                 key={candidate._id}
//                                 className="relative bg-[#121212] rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
//                                 style={{ boxShadow: "0 0 20px rgba(88, 88, 255, 0.2)" }}
//                             >
//                                 <div className="flex flex-col items-center gap-4">
//                                     <div className="w-48 h-48 rounded-lg overflow-hidden">
//                                         <img
//                                             src={candidate.avatar || "https://via.placeholder.com/150"}
//                                             alt={candidate.firstName}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-center">
//                                         {candidate.firstName} {candidate.lastName}
//                                     </h3>
//                                     <p className="text-gray-400 text-sm">{candidate.partyName || "Independent"}</p>

//                                     {/* Show Details Button */}
//                                     <button
//                                     // /admin/:id/view-candidates/candidate/:candidateId
//                                         onClick={() => navigate(`/admin/candidate/${candidate._id}`)}
//                                         className="mt-4 px-4 py-2 bg-[#0099ff] text-white rounded hover:bg-[#0077cc] transition-colors"
//                                     >
//                                         Show Details
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ViewCandidates;
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import api from "../../axiosInstance";
import { server } from "../../server";
import { userContext } from "../../context";
import "../../Styles/CandidateList.css";

function ViewCandidates() {
    const { visitorType } = useContext(userContext);
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState("");
    const { id } = useParams(); // Election ID
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCandidates();
        }
    }, [id]);

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await api.get(`${server}/candidates/candidate-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCandidates(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch candidates");
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">View Candidates</h1>
                <p className="text-gray-400 mb-6">Browse the list of registered candidates.</p>

                <Link
                    to={`/admin/${id}`}
                    state={{ visitorType }}
                    className="inline-block px-6 py-2 mb-8 border border-[#0099ff] text-[#0099ff] rounded hover:bg-[#0099ff] hover:text-white transition-colors"
                >
                    &lt; Back
                </Link>

                {error && (
                    <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {candidates.length === 0 ? (
                        <p className="text-gray-400">No candidates registered yet</p>
                    ) : (
                        candidates.map((candidate) => (
                            <div
                                key={candidate._id}
                                className="relative bg-[#121212] rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
                                style={{ boxShadow: "0 0 20px rgba(88, 88, 255, 0.2)" }}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-48 h-48 rounded-lg overflow-hidden">
                                        <img
                                            src={candidate.avatar || "https://via.placeholder.com/150"}
                                            alt={candidate.firstName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-center">
                                        {candidate.firstName} {candidate.lastName}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{candidate.partyName || "Independent"}</p>

                                    {/* Show Details Button */}
                                    <button
                                        onClick={() => navigate(`/admin/${id}/view-candidates/candidate/${candidate._id}`)}
                                        className="mt-4 px-4 py-2 bg-[#0099ff] text-white rounded hover:bg-[#0077cc] transition-colors"
                                    >
                                        Show Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Outlet for CandidateDetails */}
            <Outlet />
        </div>
    );
}

export default ViewCandidates;
