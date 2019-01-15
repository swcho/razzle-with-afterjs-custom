import { render } from '@jaredpalmer/after';
import express from 'express';
// import { getStyles } from 'simple-universal-style-loader';
import { getStyles, resetStyles } from 'style-loader/lib/context';
import routes from './routes';

if (!process.env.RAZZLE_ASSETS_MANIFEST) {
  throw new Error('No RAZZLE_ASSETS_MANIFEST');
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || 'static'))
  .get('/*', async (req, res) => {
    resetStyles();
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
      });
      // const styles = getStyles();
      // const styleStrs = (styles || [])
      //   .map((s) => `<style text="text/css" key="${s.id}">${s.parts.map((p) => p.css).join('')}</style>`)
      //   .join('');
      const styles = getStyles();
      console.log('styles', styles);
      const styleStrs = (styles || [])
        .map((s) => `<style text="text/css" key="${s.id}">${s.parts.map((p: any) => p.css).join('')}</style>`)
        .join('');
      res.send(
        (html || '')
          .replace('</head>', `<link rel="stylesheet" href="${assets['styles'].css}">${styleStrs}</head>`));
    } catch (error) {
      res.json(error);
    }
  });

export default server;
