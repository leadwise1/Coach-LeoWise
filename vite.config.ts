import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

// Replicate __dirname functionality in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * A custom Vite plugin to integrate the Express server for development.
 * This plugin ensures that the server code is only imported and used
 * during development (`pnpm dev`) and is completely ignored during
 * the production build (`pnpm build`), which resolves the build error.
 */
function expressDevServer(): Plugin {
  return {
    name: 'express-dev-server',
    // The `configureServer` hook is only called when running the dev server.
    async configureServer(server) {
      // Dynamically import the server factory.
      // This prevents server-side code (like the Gemini SDK which needs an API key)
      // from being processed during the client-side build.
      const { createServer } = await import('./server/index.js')
      server.middlewares.use(createServer())
    },
  }
}

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    plugins: [
      react(),
      // Only apply the Express server plugin in development mode.
      isDev && expressDevServer(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './client'),
        '@shared': path.resolve(__dirname, './shared'),
      },
    },
    // Define server options for the dev server
    server: {
      port: 8080, // As per AGENTS.md
    },
  }
})