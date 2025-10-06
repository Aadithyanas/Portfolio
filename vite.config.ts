import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for PDF files
          if (assetInfo.name && assetInfo.name.endsWith('.pdf')) {
            return 'assets/[name][extname]';
          }
          // Add hash for other assets
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
