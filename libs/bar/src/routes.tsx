import { BAR_PREFIX } from './constants';
import Layout from './pages/layout';
import Landing from './pages/landing';
import PageOne from './pages/one';

import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: BAR_PREFIX,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'one',
        element: <PageOne />
      }
    ]
  }
];

export default routes;
