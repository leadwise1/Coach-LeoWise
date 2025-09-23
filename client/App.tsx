import dynamic from 'next/dynamic';
import Layout from './components/site/Layout';
import { Hero } from './components/site/Hero';

// Correctly import the named export 'DebugPanel' from its module
const DebugPanel = dynamic(
  () => import('./components/site/DebugPanel').then((mod) => mod.DebugPanel),
  { ssr: false }
);
const Index = () => {
  return (
    <Layout>
      <Hero />
      {/* You can add other page sections here */}
      <DebugPanel />
    </Layout>
  );
};

// This component should be the default export if it's a page.
// The BrowserRouter wrapper is removed to fix the server-side rendering error.
export default Index;
