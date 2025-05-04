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
      options: {
        pretty: true,
      }
    }),
    VitePluginSvgSpritemap('./src/assets/icons/*.svg', {
      svgo: {
        plugins: [
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            }
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
