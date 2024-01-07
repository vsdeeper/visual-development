/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:03:03
 * @Description:
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: [{ find: '@/', replacement: '/src/' }],
  },
})
