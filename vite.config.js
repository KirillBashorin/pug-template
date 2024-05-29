import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

export default defineConfig({
  plugins: [
    ViteSvgSpriteWrapper({
      icons: 'src/assets/icons/*.svg',
      outputDir: 'public/images',
      sprite:
        'https://github.com/svg-sprite/svg-sprite/blob/main/docs/configuration.md#sprite-svg-options|options',
      typeName: 'SvgIcons',
      typeFileName: 'svg-icons',
    }),
    vituum(),
    pug({
      root: './src',
    }),
  ],
});
