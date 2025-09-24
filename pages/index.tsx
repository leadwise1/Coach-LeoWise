// pages/index.tsx
import dynamic from 'next/dynamic';
import LandingPageContent from '../client/pages/Index';
import React from 'react';

// Correctly import the named export 'DebugPanel' from its module
const DebugPanel = dynamic(
  () => import('../client/components/site/DebugPanel').then((mod) => mod.DebugPanel),
  { ssr: false }
);

const HomePage = () => {
  return (
    <>
      <LandingPageContent />
      <DebugPanel />
    </>
  );
};

export default HomePage;