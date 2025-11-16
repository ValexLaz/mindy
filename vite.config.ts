import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const backend = 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Todo lo que sea /api/... se envía al backend
      '/api': {
        target: backend,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), 
        // /api/publicaciones -> /publicaciones (backend)
      },
    },
  },
});
