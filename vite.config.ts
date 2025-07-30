import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // or 'build' if you customized it
  },
  base: "/", // VERY IMPORTANT for SPA routing
});
