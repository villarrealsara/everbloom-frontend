import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El proxy manda las peticiones que empiezan con /api al servidor de Express (puerto 3000).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3000' },
  },
  preview: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3000' },
  },
});
