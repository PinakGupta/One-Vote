import React from 'react';
import { Link } from 'react-router-dom';

function RoleSelector() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      <h1 className="text-6xl font-extrabold text-white mb-4">Welcome to Voting System</h1>
      <p className="text-2xl text-white mb-12">Please select your role to continue</p>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-12">
        <Link 
          to="/api/v1/auth/login?role=admin" 
          className="bg-purple-600 text-white font-bold text-2xl py-5 px-10 rounded-xl flex items-center justify-center hover:bg-purple-700 transition"
        >
          <span className="text-4xl mr-3">👨‍💼</span>
          <span>Login as Admin</span>
        </Link>
        
        <Link 
          to="/api/v1/auth/login?role=voter" 
          className="bg-blue-500 text-white font-bold text-2xl py-5 px-10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition"
        >
          <span className="text-4xl mr-3">👤</span>
          <span>Login as Voter</span>
        </Link>
      </div>
      
      <div className="text-white text-xl">
        <p>
          Don't have an account?{' '}
          <Link to="/api/v1/auth/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RoleSelector;