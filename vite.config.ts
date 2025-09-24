import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function expressDevServer(): Plugin {
  return {} as Plugin; // Placeholder for the actual plugin implementation
}
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'

  return {
    plugins: [
      react(),
      isDev && expressDevServer(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './client'),
        '@shared': path.resolve(__dirname, './shared'),
      },
    },
    // Only set port when running locally, not for production build
    server: isDev
      ? {
          port: 8080, // Local dev port
        }
      : undefined,
    build: {
      outDir: 'dist', // Ensure this matches the Netlify publish directory
      emptyOutDir: true,
    }
  };
})