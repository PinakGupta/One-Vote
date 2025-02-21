
// import React, { useContext, useEffect, useState } from 'react'
// import CandidateCard from '../CandidateCard'
// import api from '../../axiosInstance'
// import { server } from '../../server'
// import { Link, useParams } from 'react-router-dom'
// import "../../Styles/CandidateList.css"
// import { userContext } from '../../context'

// function UpdateCandidate() {

//      const { visitorType } = useContext(userContext)
//      const [err, setErr] = useState('')
//      const { id } = useParams()
//      const [candidate, setCandidate] = useState('')

//      useEffect(() => {
//           getCandidateList()
//      }, [])
//      const getCandidateList = async () => {
//           try {

//                const token = localStorage.getItem('accessToken')
//                const response = await api.get(`${server}/candidates/candidate-list`, {
//                     headers: {
//                          Authorization: `Bearer ${token}`
//                     },
//                })
//                setCandidate(response.data.data)
//           } catch (err) {
//                setErr(err.message)
//           }
//      }


//      const handleClick = async (id) => {
//           try {
//                window.confirm('Are you sure to delete this candidate. This action is irreversable')
//                if (!confirm) return
//                console.log(id,'this is the Id from bakcend to delete ')
//                const token = localStorage.getItem('accessToken')
//                await api.delete(`${server}/candidates/candidate-list/${id}`, {
//                     headers: {
//                          Authorization: `Bearer ${token}`
//                     }
//                })
//           } catch (error) {
//                console.log(error, error.message)
//           }
//      }

//      useEffect(() => {
//           const timer = setTimeout(() => {
//                setErr('');
//           }, 2000);

//           return () => clearTimeout(timer);
//      }, [err]);

//      return (
//           <div className="candidateList flex flex-col ">
//                {err &&
//                     <div className="errorField">
//                          <p>{err}</p>
//                     </div>
//                }

//                <div className="heading-candidate flex  justify-between flex-col gap-5">
//                     <div className="backButton">
//                          <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10     2xl:px-24">
//                               <Link to={`/admin/${id}`} state={{ visitorType }}>
//                                    <span>&lt; Back</span>
//                               </Link>
//                          </button>
//                     </div>
//                </div>
//                <div className="listItems grid gap-[80px] sm:grid-cols-3 grid-cols-2">
//                     {candidate.length <= 0 && 'No Candidates are Registered Yet'}
//                     {candidate.length > 0 && candidate.map((_, index) => (
//                          <div className="cardContainer" key={candidate[index]._id}>
//                               <CandidateCard partyName={candidate[index].partyName} candidateImage={candidate[index].avatar} candidateName={`${candidate[index].firstName} ${candidate[index].lastName}`} onClick={() => handleClick(candidate[index]._id)} />
//                          </div>
//                     ))}
//                </div>
//           </div >
//      )
// }

// export default UpdateCandidate

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';
import { userContext } from '../../context';
import "../../Styles/CandidateList.css";

function UpdateCandidateList() {
    const { visitorType } = useContext(userContext);
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.get(`${server}/candidates/candidate-list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCandidates(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch candidates');
        }
    };

    const handleSelectCandidate = (candidateId) => {
        navigate(`/admin/update-candidate/${candidateId}`);
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Choose your Candidate</h1>
                <p className="text-gray-400 mb-6">Choose your candidate considering the Rules and Regulation</p>

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
                                className="relative bg-[#121212] rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
                                onClick={() => handleSelectCandidate(candidate._id)}
                                style={{
                                    boxShadow: '0 0 20px rgba(88, 88, 255, 0.2)',
                                }}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-48 h-48 rounded-lg overflow-hidden">
                                        <img 
                                            src={candidate.avatar} 
                                            alt={candidate.firstName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-center">
                                        {candidate.firstName} {candidate.lastName}
                                    </h3>
                                    <button 
                                        className="mt-4 px-6 py-2 bg-[#5800FF] text-white rounded-md hover:bg-[#4600cc] transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectCandidate(candidate._id);
                                        }}
                                    >
                                        More Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UpdateCandidateList;