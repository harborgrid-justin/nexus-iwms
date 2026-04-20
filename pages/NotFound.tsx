import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center p-4">
      <SearchX size={64} className="text-slate-400 mb-4" />
      <h1 className="text-4xl font-bold text-slate-800">404 - Not Found</h1>
      <p className="mt-2 text-lg text-slate-600">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};
