import { defineConfig } from 'unocss/vite'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const BORDER_SHORT = {
  l: 'left',
  r: 'right',
  t: 'top',
  b: 'bottom',
}

export default defineConfig({
  presets: [presetWeapp()],
  rules: [
    [/^p-(\d+)$/, (match) => ({ padding: `${match[1]}rpx` })],
    [/^p(\w)-(\d+)$/, (match) => ({ [`padding-${BORDER_SHORT[match[1]]}`]: `${match[2]}rpx` })],
    [/^m-(\d+)$/, (match) => ({ margin: `${match[1]}rpx` })],
    [/^m(\w)-(\d+)$/, (match) => ({ [`margin-${BORDER_SHORT[match[1]]}`]: `${match[2]}rpx` })],
    [/^fs-(\d+)$/, (match) => ({ 'font-size': `${match[1]}rpx` })],
  ],
  shortcuts: {
    'flex-center': ['flex', 'items-center', 'justify-center'],
    'flex-between': ['flex', 'items-center', 'justify-between'],
    'flex-arround': ['flex', 'items-center', 'justify-around']
  },
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
})
