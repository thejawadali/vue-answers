import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Icons()
  ]
})
