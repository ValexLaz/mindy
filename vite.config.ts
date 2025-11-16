import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backend = 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': backend,
      '/evaluaciones': backend,
      '/alertas': backend,
      '/usuarios': backend,
      '/matrices': backend,
      '/preguntas': backend,
      '/respuestas': backend,
      '/recomendaciones': backend,
      '/respuesta-estudiante': backend,
      '/seguimiento': backend,      // ← ESTE ES EL IMPORTANTE
      '/roles': backend,
      '/psicologo': backend,
      '/reportes': backend,
    }
  }
});
