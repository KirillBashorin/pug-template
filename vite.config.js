import {defineConfig} from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import {fileURLToPath, URL} from "url";
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

export default defineConfig({
  plugins: [
    vituum(),
    pug({
      root: './src',
    }),
    VitePluginSvgSpritemap('./src/assets/icons/*.svg', {
      svgo: {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: ['fill', 'stroke'],
            },
          },
        ],
      },
    })
  ],
  resolve: {
    alias: [
      {find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
    ],
  },
});
