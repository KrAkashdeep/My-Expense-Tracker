import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // This is important for routing
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
