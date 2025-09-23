import { useState, useEffect, type FC } from 'react';

export const DebugPanel: FC = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [showDebug, setShowDebug] = useState<boolean>(false);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        // Try both API paths to determine which one works
        const standardPath = '/api/ping';
        const netlifyPath = '/.netlify/functions/api/ping';
        
        const standardResponse = await fetch(standardPath)
          .catch(() => ({ ok: false }));
          
        if (standardResponse.ok) {
          setApiStatus('connected');
          return;
        }
        
        const netlifyResponse = await fetch(netlifyPath)
          .catch(() => ({ ok: false }));
          
        if (netlifyResponse.ok) {
          setApiStatus('connected');
          return;
        }
        
        setApiStatus('error');
        setErrorDetails('Could not connect to API via either standard or Netlify function paths');
      } catch (error) {
        setApiStatus('error');
        setErrorDetails(error instanceof Error ? error.message : String(error));
      }
    };

    checkApiConnection();
  }, []);

  if (!showDebug) {
    return (
      <button 
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100"
        title="Show debug info"
      >
        🐞
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 p-4 rounded-lg shadow-lg max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Debug Information</h3>
        <button onClick={() => setShowDebug(false)} className="text-gray-500 hover:text-gray-700">×</button>
      </div>
      
      <div className="text-sm">
        <p>
          <span className="font-medium">Environment:</span> {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
        </p>
        <p>
          <span className="font-medium">API Status:</span>{' '}
          {apiStatus === 'checking' && 'Checking...'}
          {apiStatus === 'connected' && <span className="text-green-600">Connected</span>}
          {apiStatus === 'error' && <span className="text-red-600">Error</span>}
        </p>
        {apiStatus === 'error' && (
          <p className="text-red-600 text-xs mt-1 break-words">{errorDetails}</p>
        )}
        <p className="mt-2">
          <span className="font-medium">Base URL:</span> {window.location.origin}
        </p>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/.netlify/functions/api/ping');
              const data = await response.json();
              alert(`API Response: ${JSON.stringify(data)}`);
            } catch (error) {
              alert(`API Error: ${error instanceof Error ? error.message : String(error)}`);
            }
          }}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Test Netlify Function
        </button>
      </div>
    </div>
  );
};