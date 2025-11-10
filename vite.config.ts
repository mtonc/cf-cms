import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from 'path';

export default defineConfig({
	plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "$store": path.resolve(__dirname, './src/react-app/store'),
      "$types": path.resolve(__dirname, './src/types'),
      "$utils": path.resolve(__dirname, './src/utils'),
      "$comps": path.resolve(__dirname, './src/react-app/components'),
      "$mid": path.resolve(__dirname, './src/worker/middleware'),
      "$routes": path.resolve(__dirname, './src/worker/routes')
    }
  }
});
