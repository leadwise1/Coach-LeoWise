// pages/index.tsx
import dynamic from 'next/dynamic';
import Layout from '../client/components/site/Layout';
import LandingPageContent from '../client/pages/Index';

// Correctly import the named export 'DebugPanel' from its module
const DebugPanel = dynamic(
  () => import('../client/components/site/DebugPanel').then((mod) => mod.DebugPanel),
  { ssr: false }
);

const HomePage = () => {
  return (
    <Layout>
      <LandingPageContent />
      <DebugPanel />
    </Layout>
  );
};

export default HomePage;