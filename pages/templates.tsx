import Layout from '../client/components/site/Layout';
import TemplatesPage from '../client/pages/Templates';

/**
 * This is the Next.js page for the /templates route.
 * It imports the original Templates component and wraps it in the site Layout.
 */
const Templates = () => {
  return (
    <Layout>
      <TemplatesPage />
    </Layout>
  );
};

export default Templates;