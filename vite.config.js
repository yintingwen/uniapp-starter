import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import commonjs from '@rollup/plugin-commonjs'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import exportMerge from 'unplugin-export-merge/vite'
import { resolve } from "path"

export default defineConfig({
  transpileDependencies: ['uview-plus', 'luch-request'],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, "src"),
      },
      {
        find: '@config',
        replacement: resolve(__dirname, "src/config"),
      },
      {
        find: '@component',
        replacement: resolve(__dirname, "src/component"),
      },
      {
        find: '@api',
        replacement: resolve(__dirname, "src/api"),
      },
      {
        find: '@store',
        replacement: resolve(__dirname, "src/store"),
      },
      {
        find: '@util',
        replacement: resolve(__dirname, "src/util"),
      },
      {
        find: '@hook',
        replacement: resolve(__dirname, 'src/hook')
      },
      {
        find: '@constant',
        replacement: resolve(__dirname, 'src/constant')
      },
      {
        find: '@util',
        replacement: resolve(__dirname, 'src/util')
      }
    ]
  },
  plugins: [
    commonjs(),
    UnoCSS(),
    exportMerge({
      dirs: ['helper', 'util']
    }),
    AutoImport({
      imports:[
        "vue",
        "uni-app",
        {
          "dayjs": [["default", "dayjs"]]
        },
        {
          'md5': [["default", "md5"]]
        },
        {
          'query-string': [["default", "qs"]]
        }
      ],
      vueTemplate: true,
      defaultExportByFilename: true,
      dirs: [
        './src/apis',
        './src/configs',
        './src/constants',
        './src/helpers',
        './src/hooks',
        './src/stores',
        './src/utils'
      ],
      dts:'auto-import.d.ts'
    }),
    uni(),
  ]
})
