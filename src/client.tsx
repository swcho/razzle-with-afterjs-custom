import { After, ensureReady } from '@jaredpalmer/after';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { StyleProvider } from './StyleProvider';

const insertCssProxy = (...cssList: any[]) => {
  cssList.forEach((css) => css._insertCss && css._insertCss());
};

ensureReady(routes).then((data) =>
  hydrate(
    <StyleProvider
      insertCss={insertCssProxy}
    >
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </StyleProvider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
