import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function expressDevServer(): Plugin {
  return {
    name: 'express-dev-server',
    async configureServer(server) {
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
      isDev && expressDevServer(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './client'),
        '@shared': path.resolve(__dirname, './shared'),
      },
    },
    build: {
      outDir: 'dist/spa',   // Netlify publish folder
      emptyOutDir: true,    // Clear old builds
      base: './',           // Use relative paths for assets
    },
    server: isDev
      ? {
          port: 8080,       // Local dev server
        }
      : undefined,
  }
})