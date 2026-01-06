import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Safari 호환성을 위한 빌드 설정
    target: 'es2015', // Safari 11+ 지원
    // terser 대신 esbuild 사용 (기본값, 더 빠름)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Safari에서 모듈 로딩 문제 방지
        format: 'es',
      }
    }
  },
  server: {
    // Safari에서 CORS 문제 방지
    cors: true,
  }
})



