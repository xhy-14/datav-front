import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: "mock",
        supportTs: false,
        logger: false,
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      port: 8848,
    },
    css: {
      preprocessorOptions: {
        scss: {
          javaScriptEnabled: true,
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    build: {
      rollupOptions: {
        external: [
          "html2canvas"
        ]
      }
    },
  }
}
