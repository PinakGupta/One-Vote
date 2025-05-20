// import React, { useContext, useState, useEffect } from 'react';
// import Button from '../Button';
// import api from '../../axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import { server } from '../../server';
// import { userContext } from '../../context';
// import { useDispatch } from 'react-redux';
// import { setUserId } from '../../Redux/slicer';

// function AdminHome() {
//     const [err, setErr] = useState('');
//     const { updateVisitorId, changeVisitorType } = useContext(userContext);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleClick = async () => {
//         try {
//             const token = localStorage.getItem('accessToken');
//             const response = await api.post(`${server}/auth/logout`, null, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (response.status === 200) {
//                 localStorage.removeItem('accessToken');
//                 updateVisitorId('');
//                 changeVisitorType('');
//                 dispatch(setUserId(''));
//                 navigate('/');
//             }
//         } catch (err) {
//             console.log(err.message);
//             setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, I am trying to resolve the issue');
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setErr('');
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, [err]);

//     const buttonData = [
//         { text: 'Add Candidate', link: 'add-candidate' },
//         { text: 'View Candidates', link: 'view-candidates' },
//         { text: 'Remove Candidate', link: 'delete-candidate' },
//         { text: 'Update Candidate', link: 'update-candidate' },
//         { text: 'View Vote Counts', link: 'view-count' },
//         { text: 'Declare Results', link: 'results-toggler' }
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
//             {err && (
//                 <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-4 py-2 rounded-lg shadow-md animate-pulse">
//                     {err}
//                 </div>
//             )}

//             <header className="w-full flex justify-end p-4">
//                 <button
//                     onClick={handleClick}
//                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow">
//                     Logout
//                 </button>
//             </header>

//             <section className="text-center mb-12">
//                 <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
//                     Welcome, Admin ~ It's been a while
//                 </h1>
//                 <p className="text-2xl sm:text-3xl text-gray-300 mt-4">What are you planning to do?</p>
//             </section>

//             <section className="bg-gray-800 bg-opacity-40 rounded-2xl p-10 shadow-2xl w-full max-w-7xl">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
//                     {buttonData.map((item, index) => (
//                         <Button
//                             key={index}
//                             link={item.link}
//                             innerText={item.text}
//                             className="h-24 w-full text-white text-lg font-bold rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600" />
//                     ))}
//                 </div>
//             </section>

//             <footer className="mt-12 text-gray-500 text-sm">
//                 <p>© {new Date().getFullYear()} Election Management System</p>
//             </footer>
//         </div>
//     );
// }

// export default AdminHome;
import React, { useContext, useState, useEffect } from "react";
import Button from "../Button";
import api from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { userContext } from "../../context";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/slicer";

function AdminHome() {
  const [err, setErr] = useState("");
  const { updateVisitorId, changeVisitorType } = useContext(userContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(`${server}/auth/logout`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        updateVisitorId("");
        changeVisitorType("");
        dispatch(setUserId(""));
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setErr(
        err.response?.data?.message ||
          err.message ||
          "Sorry for the inconvenience, I am trying to resolve the issue"
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [err]);

  const buttonData = [
    { text: "Add Candidate", link: "add-candidate" },
    { text: "View Candidates", link: "view-candidates" },
    { text: "Remove Candidate", link: "delete-candidate" },
    { text: "Update Candidate", link: "update-candidate" },
    { text: "View Vote Counts", link: "view-count" },
    { text: "Declare Results", link: "results-toggler" },
    { text: "Add Voters", link: "add-voters" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
      {err && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-4 py-2 rounded-lg shadow-md animate-pulse">
          {err}
        </div>
      )}

      {/* <header className="w-full flex justify-end p-4">
                <button 
                    onClick={handleClick} 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow">
                    Logout
                </button>
            </header> */}
      <header className="w-full flex justify-end px-10 pt-6 absolute top-0 right-0">
        <button
          onClick={handleClick}
          className="px-6 py-2 text-white text-lg font-bold rounded-lg shadow-md border border-gray-00 transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600"
        >
          Logout
        </button>
      </header>

      <section className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          Welcome, Admin ~ It's been a while
        </h1>
        <p className="text-2xl sm:text-3xl text-gray-300 mt-4">
          What are you planning to do?
        </p>
      </section>

      <section className="bg-gray-800 bg-opacity-40 rounded-2xl p-10 shadow-2xl w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {buttonData.map((item, index) => (
            <Button
              key={index}
              link={item.link}
              innerText={item.text}
              className="h-24 w-full text-white text-lg font-bold rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600"
            />
          ))}
        </div>
      </section>

      <footer className="mt-12 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Election Management System</p>
      </footer>
    </div>
  );
}

export default AdminHome;
