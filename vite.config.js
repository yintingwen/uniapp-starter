import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import commonjs from '@rollup/plugin-commonjs'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import exportMerge from 'unplugin-export-merge/vite'
import { resolve } from 'path'

export default defineConfig({
  transpileDependencies: ['uview-plus', 'luch-request'],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '@config',
        replacement: resolve(__dirname, 'src/config'),
      },
      {
        find: '@component',
        replacement: resolve(__dirname, 'src/component'),
      },
      {
        find: '@api',
        replacement: resolve(__dirname, 'src/api'),
      },
      {
        find: '@store',
        replacement: resolve(__dirname, 'src/store'),
      },
      {
        find: '@util',
        replacement: resolve(__dirname, 'src/util'),
      },
      {
        find: '@hook',
        replacement: resolve(__dirname, 'src/hook'),
      },
      {
        find: '@constant',
        replacement: resolve(__dirname, 'src/constant'),
      },
      {
        find: '@enum',
        replacement: resolve(__dirname, 'src/enum'),
      },
      {
        find: '@util',
        replacement: resolve(__dirname, 'src/util'),
      },
    ],
  },
  plugins: [
    commonjs(),
    UnoCSS(),
    exportMerge({
      dirs: ['./src/apis', './src/helper', './src/util'],
    }),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        {
          md5: [['default', 'md5']],
        },
        {
          'query-string': [['default', 'qs']],
        },
      ],
      vueTemplate: true,
      defaultExportByFilename: true,
      dirs: [
        './src/config',
        './src/constant',
        './src/enum',
        './src/hook',
        './src/store',
        './src/tool',
        './src/export-merge',
      ],
      dts: true,
    }),
    uni(),
  ],
})
