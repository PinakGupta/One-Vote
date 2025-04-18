// // // src/Components/Admin/ElectionCreation.jsx
// // import React from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';

// // function ElectionCreation() {
// //   const { id } = useParams(); // Get the admin ID from the route
// //   const navigate = useNavigate();

// //   const handleCreateElection = () => {
// //     navigate(`/admin/${id}`);
// //   };

// //   return (
// //     <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
// //       <h1 className="text-6xl font-extrabold text-white mb-4">Election Setup</h1>
// //       <p className="text-2xl text-white mb-12">Ready to create a new election?</p>
// //       <button
// //         onClick={handleCreateElection}
// //         className="bg-green-500 text-white font-bold text-2xl py-5 px-10 rounded-xl hover:bg-green-600 transition"
// //       >
// //         Create Election
// //       </button>
// //     </div>
// //   );
// // }

// // export default ElectionCreation;
// // src/Components/Admin/ElectionCreation.jsx
// // import React from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';

// // function ElectionCreation() {
// //   const { id } = useParams(); // Get the admin ID from the route
// //   const navigate = useNavigate();

// //   const handleCreateElection = () => {
// //     navigate(`/admin/${id}`);
// //   };

// //   const handleViewElection = () => {
// //     navigate(`/admin/${id}`);
// //   };

// //   // Dummy data for Election model
// //   const dummyElections = [
// //     {
// //       admin: '67b317f3af888507d74ce9e7',
// //       electionId: 'ELEC001',
// //       name: 'General Election 2025',
// //       voters: [123456, 789012, 345678],
// //       candidates: ['cand_001', 'cand_002'],
// //       votedUsers: [],
// //       showResults: false,
// //       startDate: '2025-04-18T10:00:00Z',
// //       endDate: '2025-04-25T18:00:00Z',
// //       isActive: true,
// //       createdAt: '2025-04-18T08:00:00Z',
// //       updatedAt: '2025-04-18T08:00:00Z',
// //     },
// //     {
// //       admin: '67b317f3af888507d74ce9e8',
// //       electionId: 'ELEC002',
// //       name: 'Local Council Election',
// //       voters: [901234, 567890],
// //       candidates: ['cand_003'],
// //       votedUsers: [901234],
// //       showResults: true,
// //       startDate: '2025-05-01T09:00:00Z',
// //       endDate: null,
// //       isActive: true,
// //       createdAt: '2025-04-20T12:00:00Z',
// //       updatedAt: '2025-05-01T10:00:00Z',
// //     },
// //   ];

// //   return (
// //     <div className="h-screen w-screen bg-black flex flex-col items-center p-6 overflow-auto">
// //       {/* Top Section: Create Election */}
// //       <div className="flex flex-col items-center justify-center mb-12">
// //         <h1 className="text-6xl font-extrabold text-white mb-4">Election Setup</h1>
// //         <p className="text-2xl text-white mb-8">Ready to create a new election?</p>
// //         <button
// //           onClick={handleCreateElection}
// //           className="bg-green-500 text-white font-bold text-2xl py-5 px-10 rounded-xl hover:bg-green-600 transition"
// //         >
// //           Create Election
// //         </button>
// //       </div>

// //       {/* Bottom Section: Generated Elections */}
// //       <div className="w-full max-w-6xl">
// //         <h2 className="text-4xl font-bold text-white mb-6 text-center">Generated Elections</h2>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-white border-collapse">
// //             <thead>
// //               <tr className="bg-gray-800">
// //                 <th className="p-3 text-left text-lg font-semibold">Election ID</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Name</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Admin ID</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Voters</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Candidates</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Voted Users</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Show Results</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Start Date</th>
// //                 <th className="p-3 text-left text-lg font-semibold">End Date</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Active</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Created At</th>
// //                 <th className="p-3 text-left text-lg font-semibold">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {dummyElections.map((election, index) => (
// //                 <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
// //                   <td className="p-3">{election.electionId}</td>
// //                   <td className="p-3">{election.name}</td>
// //                   <td className="p-3">{election.admin}</td>
// //                   <td className="p-3">{election.voters.length} voters</td>
// //                   <td className="p-3">{election.candidates.length} candidates</td>
// //                   <td className="p-3">{election.votedUsers.length} users</td>
// //                   <td className="p-3">{election.showResults ? 'Yes' : 'No'}</td>
// //                   <td className="p-3">{new Date(election.startDate).toLocaleDateString()}</td>
// //                   <td className="p-3">{election.endDate ? new Date(election.endDate).toLocaleDateString() : 'N/A'}</td>
// //                   <td className="p-3">{election.isActive ? 'Yes' : 'No'}</td>
// //                   <td className="p-3">{new Date(election.createdAt).toLocaleDateString()}</td>
// //                   <td className="p-3">
// //                     <button
// //                       onClick={handleViewElection}
// //                       className="bg-green-500 text-white font-semibold text-base py-2 px-4 rounded-lg hover:bg-green-600 transition"
// //                     >
// //                       View
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ElectionCreation;

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
//     <div className="h-screen w-screen bg-black flex flex-col items-center p-6 overflow-auto">
//       {/* Top Section: Create Election */}
//       <div className="flex flex-col items-center justify-center mb-12">
//         <h1 className="text-6xl font-extrabold text-white mb-4">Election Setup</h1>
//         <p className="text-2xl text-white mb-8">Ready to create a new election?</p>
//         <button
//           onClick={handleCreateElection}
//           className="bg-green-500 text-white font-bold text-2xl py-5 px-10 rounded-xl hover:bg-green-600 transition"
//         >
//           Create Election
//         </button>
//       </div>

//       {/* Bottom Section: Generated Elections */}
//       <div className="w-full max-w-6xl">
//         <h2 className="text-4xl font-bold text-white mb-6 text-center">Generated Elections</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-white border-collapse">
//             <thead>
//               <tr className="bg-gray-800">
//                 <th className="p-3 text-left text-lg font-semibold">Election ID</th>
//                 <th className="p-3 text-left text-lg font-semibold">Name</th>
//                 <th className="p-3 text-left text-lg font-semibold">Admin ID</th>
//                 <th className="p-3 text-left text-lg font-semibold">Voters</th>
//                 <th className="p-3 text-left text-lg font-semibold">Candidates</th>
//                 <th className="p-3 text-left text-lg font-semibold">Voted Users</th>
//                 <th className="p-3 text-left text-lg font-semibold">Show Results</th>
//                 <th className="p-3 text-left text-lg font-semibold">Start Date</th>
//                 <th className="p-3 text-left text-lg font-semibold">End Date</th>
//                 <th className="p-3 text-left text-lg font-semibold">Active</th>
//                 <th className="p-3 text-left text-lg font-semibold">Created At</th>
//                 <th className="p-3 text-left text-lg font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dummyElections.map((election, index) => (
//                 <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
//                   <td className="p-3">{election.electionId}</td>
//                   <td className="p-3">{election.name}</td>
//                   <td className="p-3">{election.admin}</td>
//                   <td className="p-3">{election.voters.length} voters</td>
//                   <td className="p-3">{election.candidates.length} candidates</td>
//                   <td className="p-3">{election.votedUsers.length} users</td>
//                   <td className="p-3">{election.showResults ? 'Yes' : 'No'}</td>
//                   <td className="p-3">{new Date(election.startDate).toLocaleDateString()}</td>
//                   <td className="p-3">{election.endDate ? new Date(election.endDate).toLocaleDateString() : 'N/A'}</td>
//                   <td className="p-3">{election.isActive ? 'Yes' : 'No'}</td>
//                   <td className="p-3">{new Date(election.createdAt).toLocaleDateString()}</td>
//                   <td className="p-3">
//                     <button
//                       onClick={handleViewElection}
//                       className="bg-green-500 text-white font-semibold text-base py-2 px-4 rounded-lg hover:bg-green-600 transition"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ElectionCreation;
// src/Components/Admin/ElectionCreation.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ElectionCreation() {
  const { id } = useParams(); // Get the admin ID from the route
  const navigate = useNavigate();

  const handleCreateElection = () => {
    navigate(`/admin/${id}/create-election`);
  };

  // Dummy data for Election model
  const dummyElections = [
    {
      admin: '67b317f3af888507d74ce9e7',
      electionId: 'ELEC001',
      name: 'General Election 2025',
      voters: [123456, 789012, 345678],
      candidates: ['cand_001', 'cand_002'],
      votedUsers: [],
      showResults: false,
      startDate: '2025-04-18T10:00:00Z',
      endDate: '2025-04-25T18:00:00Z',
      isActive: true,
      createdAt: '2025-04-18T08:00:00Z',
      updatedAt: '2025-04-18T08:00:00Z',
    },
    {
      admin: '67b317f3af888507d74ce9e8',
      electionId: 'ELEC002',
      name: 'Local Council Election',
      voters: [901234, 567890],
      candidates: ['cand_003'],
      votedUsers: [901234],
      showResults: true,
      startDate: '2025-05-01T09:00:00Z',
      endDate: null,
      isActive: true,
      createdAt: '2025-04-20T12:00:00Z',
      updatedAt: '2025-05-01T10:00:00Z',
    },
  ];

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
        <table className="w-full text-white border-collapse">
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
            </tr>
          </thead>
          <tbody>
            {dummyElections.map((election, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="p-2 text-sm">{election.electionId}</td>
                <td className="p-2 text-sm">{election.name}</td>
                <td className="p-2 text-sm">{election.admin}</td>
                <td className="p-2 text-sm">{election.voters.length} voters</td>
                <td className="p-2 text-sm">{election.candidates.length} candidates</td>
                <td className="p-2 text-sm">{election.votedUsers.length} users</td>
                <td className="p-2 text-sm">{election.showResults ? 'Yes' : 'No'}</td>
                <td className="p-2 text-sm">{new Date(election.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ElectionCreation;