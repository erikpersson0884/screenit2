import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    port: 3000,
    // proxy: {
    //   "/api/": {
    //     target: "http://screenit.chalmers.it/api/",
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [react()],})
