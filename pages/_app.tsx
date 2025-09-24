import type { AppProps } from 'next/app';

// Import the global CSS file here.
// This is the ONLY place where global CSS can be imported in a Next.js pages project.
import '../client/global.css';

/**
 * The `_app.tsx` component is a special Next.js file that wraps every page.
 * It's the perfect place to load global styles, context providers, or layouts.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return < Component {...pageProps} />;
}

export default MyApp;