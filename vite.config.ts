import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const { IS_BUILD_LIB } = process.env
  return {
    plugins: [
      vue(),
      cssInjectedByJsPlugin(),
      AutoImport({
        imports: ['vue'],
        dts: './auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      Components({
        dts: './components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      ElementPlus({
        ignoreComponents: ['AutoResizer'] // 解决 Table-v2 AutoResizer with manual import: failed to resolve css file
      }),
      Inspect()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build:
      IS_BUILD_LIB === 'true'
        ? {
            emptyOutDir: false,
            copyPublicDir: false,
            lib: {
              entry: 'src/components/index.ts',
              name: 'visual-development',
              fileName: 'index'
            },
            rollupOptions: {
              external: [
                'vue',
                '@element-plus/icons-vue',
                'element-plus',
                'lodash-es',
                'radash',
                'nanoid',
                'pinia',
                'vuedraggable'
              ],
              output: {
                globals: {
                  vue: 'Vue',
                  '@element-plus/icons-vue': 'ElementPlusIconsVue',
                  'element-plus': 'ElementPlus',
                  'lodash-es': 'LodashEs',
                  radash: 'Radash',
                  nanoid: 'Nanoid',
                  pinia: 'Pinia',
                  vuedraggable: 'Vuedraggable'
                }
              }
            }
          }
        : undefined
  }
})
