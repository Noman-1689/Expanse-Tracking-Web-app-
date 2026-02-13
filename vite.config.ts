import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Separate ApexCharts (the biggest culprit)
          if (id.includes("apexcharts") || id.includes("react-apexcharts")) {
            return "vendor-charts";
          }
          // 2. Separate Material Tailwind and its animation engine (Framer Motion)
          if (
            id.includes("@material-tailwind") ||
            id.includes("framer-motion")
          ) {
            return "vendor-ui";
          }
          // 3. Separate standard node_modules (React, etc.)
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    // Raise the limit to 1000kB so the warning disappears
    chunkSizeWarningLimit: 1000,
  },
});
