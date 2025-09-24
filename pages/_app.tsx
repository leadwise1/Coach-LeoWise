import type { AppProps } from 'next/app';

// Import the globsis the ONLY place where global CSS can be imported in a Next.js pages project.
import '@/global.css';
import Layout from '../client/components/site/Layout';
import React from 'react';

/**
 * The `_app.tsx` component is a special Next.js file that wraps every page. 
 * It's the perfect place to load global styles, context providers, or layouts. 
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;