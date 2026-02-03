import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
<<<<<<< HEAD

=======
    server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
});


