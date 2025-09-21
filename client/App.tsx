import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleGenerateResume = () => {
    navigate('/resume');
  };

  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold mb-8">Welcome to Coach-LeoWise</h1>
      <p className="text-lg mb-8">Create an AI-powered, ATS-optimized resume in minutes.</p>
      <button
        onClick={handleGenerateResume}
        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Generate My Resume
      </button>
    </div>
  );
};

export default Index;
