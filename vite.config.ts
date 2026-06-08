import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
  server: {
    host: "localhost",
    port: 3000,
  },
});
