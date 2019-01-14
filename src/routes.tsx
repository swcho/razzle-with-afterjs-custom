import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';
import { RouteProps } from 'react-router-dom';

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/*',
    exact: true,
    component: asyncComponent({
      loader: () => import('./AppPage'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];

export default routes;
