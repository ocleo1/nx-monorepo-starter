import PageOne from './pages/One';

import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: 'bar',
    children: [
      {
        index: true,
        element: <PageOne />
      },
      {
        path: 'one',
        element: <PageOne />
      }
    ]
  }
];

export default routes;
