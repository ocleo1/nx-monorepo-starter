import PageOne from './pages/One';

import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    index: true,
    element: <PageOne />
  },
  {
    path: 'one',
    element: <PageOne />
  }
];

export default routes;
