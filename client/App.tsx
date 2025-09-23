import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// Correctly import the named export 'DebugPanel' from its module
const DebugPanel = dynamic(
  () => import('./components/site/DebugPanel').then((mod) => mod.DebugPanel),
  { ssr: false }
);

const Index = () => {
  const router = useRouter();

  const handleGenerateResume = () => {
    // Use Next.js router for client-side navigation without a full page reload
    router.push('/resume');
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

      <DebugPanel />
    </div>
  );
};

// This component should be the default export if it's a page.
// The BrowserRouter wrapper is removed to fix the server-side rendering error.
export default Index;
