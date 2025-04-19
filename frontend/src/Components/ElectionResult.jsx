import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { server } from '../server';

const ElectionResult = () => {
  const { userId, electionId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchElectionResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/elections/${userId}/${electionId}/result`);
        setResultData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };
    
    fetchElectionResults();
  }, [userId, electionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-white">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || (resultData && !resultData.isResultsAvailable)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-lg shadow-lg bg-gray-800 text-center max-w-lg"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4">Results Not Available</h2>
          <p className="text-white text-lg">
            {error || "Results are not yet declared by admin."}
          </p>
          <div className="mt-6">
            <button 
              onClick={() => window.history.back()} 
              className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const { election, candidates, totalVotes, winner } = resultData;
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Election Results
          </motion.h1>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-blue-400 mb-2"
          >
            {election.name}
          </motion.div>
          <div className="text-gray-400">
            Total Votes: <span className="text-white font-semibold">{totalVotes}</span>
          </div>
        </div>

        {/* Winner Section */}
        {winner && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">WINNER</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 animate-pulse"></div>
                  <div className="relative p-1">
                    <img 
                      src={winner.avatar || "/api/placeholder/120/120"} 
                      alt={`${winner.firstName} ${winner.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                    />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-white">{winner.firstName} {winner.lastName}</h3>
                  <p className="text-gray-300">{winner.representative}</p>
                  <p className="text-gray-400 text-sm">{winner.town}</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="text-4xl font-bold text-white mb-2">{winner.votesCount}</div>
                {/* <div className="text-lg text-yellow-400">
                  {(winner.percentage || 0).toFixed(1)}% of total votes
                </div> */}
              </div>
            </div>
          </motion.div>
        )}

        {/* All Candidates Results */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {candidates.map((candidate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className={`bg-gray-800 rounded-xl p-4 border ${
                index === 0 ? 'border-yellow-500' : 'border-gray-700'
              } shadow-lg`}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={candidate.avatar || "/api/placeholder/80/80"} 
                  alt={`${candidate.firstName} ${candidate.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">{candidate.firstName} {candidate.lastName}</h3>
                  <p className="text-gray-400">{candidate.representative}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xl font-bold text-white">{candidate.votesCount}</div>
                  <div className="text-sm text-blue-400">{candidate.percentage.toFixed(1)}%</div>
                </div>
              </div>
              
              {/* Vote percentage bar */}
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.percentage}%` }}
                  transition={{ duration: 1, delay: 1 + (0.1 * index) }}
                  className={`h-4 rounded-full ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-blue-500'
                  }`}
                ></motion.div>
              </div>
              
              {/* Candidate details */}
              <div className="text-sm text-gray-400">
                <div className="flex justify-between mb-1">
                  <span>Town:</span>
                  <span className="text-gray-300">{candidate.town}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-gray-300">{candidate.candidateType}</span>
                </div>
              </div>
              
              {/* Promises */}
              {candidate.promise && candidate.promise.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-gray-300 font-medium mb-2">Top Promises:</h4>
                  <ul className="text-sm text-gray-400">
                    {candidate.promise.slice(0, 2).map((promise, idx) => (
                      <li key={idx} className="flex items-start mb-1">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>{promise}</span>
                      </li>
                    ))}
                    {candidate.promise.length > 2 && (
                      <li className="text-blue-400 text-sm cursor-pointer hover:underline">
                        + {candidate.promise.length - 2} more promises
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ElectionResult;