import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/echoes-of-yesterday/',
  plugins: [vue()]
});