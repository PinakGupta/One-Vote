import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server';

const SpecificCandidate = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  
  const params = useParams();
  const navigate = useNavigate();
  
  // Extract IDs from URL
  const userId = params.id;
  const electionId = params.electionId;
  const candidateId = params.candidateId;

  useEffect(() => {
    // Animation trigger
    setAnimate(true);
    
    // Fetch candidate data
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        
        // First check if user has already voted
        const voteStatusResponse = await axios.get(`${server}/elections/check-vote-status/${userId}/${electionId}`);
        setHasVoted(voteStatusResponse.data.hasVoted);
        
        // Then get candidate details
        const candidateResponse = await axios.get(`${server}/candidates/candidate-list/candidate/${candidateId}`);
        setCandidate(candidateResponse.data.candidate);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load candidate details');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchCandidate();
  }, [userId, electionId, candidateId]);

  const handleVote = async () => {
    try {
      setVoteLoading(true);
      const response = await axios.post(`${server}/elections/vote`, {
        userId,
        electionId,
        candidateId
      });
      
      if (response.data.success) {
        setVoteSuccess(true);
        setHasVoted(true);
        
        // Update candidate vote count locally
        setCandidate(prev => ({
          ...prev,
          votesCount: prev.votesCount + 1
        }));
        
        setTimeout(() => {
          setVoteSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setError('Failed to cast vote. Please try again.');
      console.error(error);
    } finally {
      setVoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        </div>
        <p className="text-white mt-4 text-xl">Loading candidate information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center">
        <div className="bg-red-900 bg-opacity-30 p-6 rounded-xl border border-red-800 max-w-md">
          <h2 className="text-red-400 text-2xl mb-4">Error</h2>
          <p className="text-white">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      
      {/* Success message overlay */}
      {voteSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-green-900 bg-opacity-90 p-8 rounded-2xl max-w-md transform scale-up animate-bounce">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white text-center">Vote Cast Successfully!</h3>
            <p className="text-green-300 text-center mt-2">Your vote has been recorded</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Navigation */}
        <div className="mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-all group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Candidates
          </button>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Candidate Photo & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-blue-900/20 transition-all duration-500">
              <div className="h-48 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                {candidate.avatar ? (
                  <img 
                    src={candidate.avatar} 
                    alt={`${candidate.firstName} ${candidate.lastName}`} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold">
                    {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{candidate.firstName} {candidate.lastName}</h1>
                <div className="flex items-center mb-6">
                  <span className="px-3 py-1 bg-blue-900 bg-opacity-50 rounded-full text-blue-300 text-sm mr-2">
                    {candidate.candidateType}
                  </span>
                  <span className="px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-sm">
                    {candidate.representative}
                  </span>
                </div>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Voter ID:</span>
                    <span>{candidate.voterId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Town:</span>
                    <span>{candidate.town}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date of Birth:</span>
                    <span>{new Date(candidate.dob).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {!hasVoted ? (
                  <button
                    onClick={handleVote}
                    disabled={voteLoading}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-lg shadow-lg transform hover:translate-y-1 transition-all duration-500 flex items-center justify-center"
                  >
                    {voteLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Vote for this Candidate'
                    )}
                  </button>
                ) : (
                  <div className="mt-8 py-4 bg-gray-800 rounded-xl font-bold text-center text-lg border border-green-700 text-gray-300">
                    You have already voted
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Candidate Promises & Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-3xl p-8 h-full border border-gray-800 shadow-xl hover:shadow-purple-900/20 transition-all duration-500">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4 text-blue-300">
                Campaign Promises
              </h2>
              
              <ul className="space-y-4">
                {candidate.promise && candidate.promise.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start p-4 bg-gray-800 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all"
                  >
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-300">{item}</p>
                  </li>
                ))}
                
                {(!candidate.promise || candidate.promise.length === 0) && (
                  <li className="p-4 bg-gray-800 bg-opacity-50 rounded-xl text-gray-400 italic">
                    No campaign promises listed.
                  </li>
                )}
              </ul>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4 text-purple-300">
                  About the Candidate
                </h2>
                
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-gray-500">Name</h3>
                      <p className="text-lg">{candidate.firstName} {candidate.lastName}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-gray-500">Candidate Type</h3>
                      <p className="text-lg">{candidate.candidateType}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-gray-500">Representative Of</h3>
                      <p className="text-lg">{candidate.representative}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-gray-500">Town</h3>
                      <p className="text-lg">{candidate.town}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated pulse at the bottom */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-75">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-150"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default SpecificCandidate;