import { render } from '@jaredpalmer/after';
import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import routes from './routes';
import { StyleProvider } from './StyleProvider';

if (!process.env.RAZZLE_ASSETS_MANIFEST) {
  throw new Error('No RAZZLE_ASSETS_MANIFEST');
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || 'static'))
  .get('/*', async (req, res) => {
    // const styles = getStyles();
    // (styles || []).length = 0;
    const css: Array<{ id: string; css: string; }> = []; // CSS for all rendered React components
    const insertCss = (...styleList: any[]) => styleList.forEach((style) => {
      if (style._getContent) {
        const content = style._getContent();
        content.forEach((c: any) => {
          css.push({
            id: c[0],
            css: c[1],
          });
        });
      }
    });
    const html = await render({
      req,
      res,
      routes,
      assets,
      // Anything else you add here will be made available
      // within getInitialProps(ctx)
      // e.g a redux store...
      // customThing: 'thing',
      customRenderer: (element: React.ReactElement<any>) => ({
        html: ReactDOMServer.renderToString((
          <StyleProvider insertCss={insertCss}>
            {element}
          </StyleProvider>
        ))
      }),
    });
    console.log(req.url);
    const htmlWithCommonCss = (html || '')
      .replace(
        '</head>', 
        `<link rel="stylesheet" href="${assets['vendor'] && assets['vendor'].css || ''}">
        <link rel="stylesheet" href="${assets['common'] && assets['common'].css || ''}">
        </head>`);
    if (css.length) {
      const styleStrs = css
        .map((s) => `<style text="text/css" id="s${s.id}-0">${s.css}</style>`)
        .join('');
      res.send(
        htmlWithCommonCss
          .replace('</head>', `${styleStrs}</head>`));
      return;
    }
    res.send(htmlWithCommonCss);
  });

export default server;
