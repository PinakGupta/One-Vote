// // src/Components/Admin/ElectionCreation.jsx
// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function ElectionCreation() {
//   const { id } = useParams(); // Get the admin ID from the route
//   const navigate = useNavigate();

//   const handleCreateElection = () => {
//     navigate(`/admin/${id}/create-election`);
//   };

//   const handleViewElection = () => {
//     navigate(`/admin/${id}`);
//   };

//   // Dummy data for Election model
//   const dummyElections = [
//     {
//       admin: '67b317f3af888507d74ce9e7',
//       electionId: 'ELEC001',
//       name: 'General Election 2025',
//       voters: [123456, 789012, 345678],
//       candidates: ['cand_001', 'cand_002'],
//       votedUsers: [],
//       showResults: false,
//       startDate: '2025-04-18T10:00:00Z',
//       endDate: '2025-04-25T18:00:00Z',
//       isActive: true,
//       createdAt: '2025-04-18T08:00:00Z',
//       updatedAt: '2025-04-18T08:00:00Z',
//     },
//     {
//       admin: '67b317f3af888507d74ce9e8',
//       electionId: 'ELEC002',
//       name: 'Local Council Election',
//       voters: [901234, 567890],
//       candidates: ['cand_003'],
//       votedUsers: [901234],
//       showResults: true,
//       startDate: '2025-05-01T09:00:00Z',
//       endDate: null,
//       isActive: true,
//       createdAt: '2025-04-20T12:00:00Z',
//       updatedAt: '2025-05-01T10:00:00Z',
//     },
//   ];

//   return (
//     <div className="min-h-screen w-screen bg-black flex flex-col items-center p-4 max-h-screen">
//       {/* Top Section: Create Election */}
//       <div className="flex flex-col items-center mb-8">
//         <h1 className="text-5xl font-extrabold text-white mb-4">Election Setup</h1>
//         <p className="text-xl text-white mb-6">Ready to create a new election?</p>
//         <button
//           onClick={handleCreateElection}
//           className="bg-green-500 text-white font-bold text-xl py-4 px-8 rounded-xl hover:bg-green-600 transition"
//         >
//           Create Election
//         </button>
//       </div>

//       {/* Bottom Section: Generated Elections */}
//       <div className="w-full max-w-full">
//         <h2 className="text-3xl font-bold text-white mb-4 text-center">Generated Elections</h2>
//         <table className="w-full min-w-fit text-white border-collapse">
//           <thead>
//             <tr className="bg-gray-800">
//               <th className="p-2 text-left text-base font-semibold">Election ID</th>
//               <th className="p-2 text-left text-base font-semibold">Name</th>
//               <th className="p-2 text-left text-base font-semibold">Admin ID</th>
//               <th className="p-2 text-left text-base font-semibold">Voters</th>
//               <th className="p-2 text-left text-base font-semibold">Candidates</th>
//               <th className="p-2 text-left text-base font-semibold">Voted Users</th>
//               <th className="p-2 text-left text-base font-semibold">Show Results</th>
//               <th className="p-2 text-left text-base font-semibold">Created At</th>
//               <th className="p-2 text-left text-base font-semibold w-40">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dummyElections.map((election, index) => (
//               <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
//                 <td className="p-2 text-xs truncate">{election.electionId}</td>
//                 <td className="p-2 text-xs truncate">{election.name}</td>
//                 <td className="p-2 text-xs truncate">{election.admin}</td>
//                 <td className="p-2 text-xs">{election.voters.length} voters</td>
//                 <td className="p-2 text-xs">{election.candidates.length} candidates</td>
//                 <td className="p-2 text-xs">{election.votedUsers.length} users</td>
//                 <td className="p-2 text-xs">{election.showResults ? 'Yes' : 'No'}</td>
//                 <td className="p-2 text-xs">{new Date(election.createdAt).toLocaleDateString()}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={handleViewElection}
//                     className="bg-green-500 text-white font-semibold text-lg py-3 px-5 rounded-lg hover:bg-green-600 transition inline-block z-10"
//                   >
//                     View Election
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ElectionCreation;
// src/Components/Admin/ElectionCreation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';

function ElectionCreation() {
  const { id } = useParams(); // Get the admin ID from the route
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [error, setError] = useState('');

  // Fetch elections for the admin
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Please log in to view elections');
          setTimeout(() => setError(''), 2000);
          return;
        }
        const response = await api.get(`${server}/admin/${id}/get-elections`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setElections(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch elections');
        setTimeout(() => setError(''), 2000);
      }
    };
    fetchElections();
  }, []);

  const handleCreateElection = () => {
    navigate(`/admin/${id}/create-election`);
  };

  const handleViewElection = (electionId) => {
    navigate(`/admin/${id}/election/${electionId}`);
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center p-4 max-h-screen">
      {/* Top Section: Create Election */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl font-extrabold text-white mb-4">Election Setup</h1>
        <p className="text-xl text-white mb-6">Ready to create a new election?</p>
        <button
          onClick={handleCreateElection}
          className="bg-green-500 text-white font-bold text-xl py-4 px-8 rounded-xl hover:bg-green-600 transition"
        >
          Create Election
        </button>
      </div>

      {/* Bottom Section: Generated Elections */}
      <div className="w-full max-w-full">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Generated Elections</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-full text-center">
            {error}
          </div>
        )}
        {elections.length > 0 ? (
          <table className="w-full min-w-fit text-white border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 text-left text-base font-semibold">Election ID</th>
                <th className="p-2 text-left text-base font-semibold">Name</th>
                <th className="p-2 text-left text-base font-semibold">Admin ID</th>
                <th className="p-2 text-left text-base font-semibold">Voters</th>
                <th className="p-2 text-left text-base font-semibold">Candidates</th>
                <th className="p-2 text-left text-base font-semibold">Voted Users</th>
                <th className="p-2 text-left text-base font-semibold">Show Results</th>
                <th className="p-2 text-left text-base font-semibold">Created At</th>
                <th className="p-2 text-left text-base font-semibold w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election._id} className="border-b border-gray-700 hover:bg-gray-900">
                  <td className="p-2 text-xs truncate">{election.electionId}</td>
                  <td className="p-2 text-xs truncate">{election.name}</td>
                  <td className="p-2 text-xs truncate">{election.admin}</td>
                  <td className="p-2 text-xs">{election.voters.length} voters</td>
                  <td className="p-2 text-xs">{election.candidates.length} candidates</td>
                  <td className="p-2 text-xs">{election.votedUsers.length} users</td>
                  <td className="p-2 text-xs">{election.showResults ? 'Yes' : 'No'}</td>
                  <td className="p-2 text-xs">
                    {new Date(election.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleViewElection(election.electionId)}
                      className="bg-green-500 text-white font-semibold text-lg py-3 px-5 rounded-lg hover:bg-green-600 transition inline-block z-10"
                    >
                      View Election
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white text-lg text-center">No elections created yet.</p>
        )}
      </div>
    </div>
  );
}

export default ElectionCreation;