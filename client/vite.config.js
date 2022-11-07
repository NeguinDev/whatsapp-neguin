import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 80;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	preview: {
		port
	}
})