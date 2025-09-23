import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }): UserConfig => {
  if (mode !== "production") {
    require("dotenv").config();
  }

  return {
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
      sourcemap: mode !== "production",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
    define: {
      __BUILD_KEY__: JSON.stringify(process.env.VITE_PUBLIC_BUILDER_KEY),
      __PING_MESSAGE__: JSON.stringify(process.env.VITE_PING_MESSAGE),
    },
  };
});