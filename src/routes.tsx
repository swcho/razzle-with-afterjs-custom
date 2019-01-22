import React from 'react';

import { asyncComponent, AsyncRouteProps } from '@jaredpalmer/after';

export type RouteParams = {
};

const routes: AsyncRouteProps[] = [
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
    path: '/posts*',
    exact: true,
    component: asyncComponent({
      loader: () => import('./PostPage'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/app',
    exact: true,
    component: asyncComponent({
      loader: () => import('./AppPage'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];

export default routes;
