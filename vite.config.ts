import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServe({
    mockPath: 'mock', // mock 数据文件存放的路径
    enable: true, // 开启本地 mock 数据
    watchFiles: true,
  }),],
  base: './'
})
