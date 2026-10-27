import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({plugins:[react(),viteSingleFile()],base:'./',build:{outDir:'dist',assetsInlineLimit:10000000,chunkSizeWarningLimit:2500},server:{port:4173,strictPort:true}});
