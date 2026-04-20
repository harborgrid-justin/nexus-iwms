import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { NotFound } from './NotFound';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  let errorMessage = 'The application encountered an unexpected error.';
  let errorDetails = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = error.data?.message || 'Route error response';
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || '';
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    try {
        errorMessage = JSON.stringify(error);
    } catch {
        errorMessage = 'Unknown error type';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Oops! Something went wrong.</h1>
      <p className="text-slate-600 mb-4">{errorMessage}</p>
      {errorDetails && (
        <pre className="text-xs text-red-600 bg-red-50 p-4 rounded border border-red-200 mb-6 overflow-auto max-w-full text-left">
          {errorDetails}
        </pre>
      )}
      <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Return to Dashboard
      </button>
    </div>
  );
};