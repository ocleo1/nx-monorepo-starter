import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import InjectReducer from './HOC/InjectReducer';
import { worldStore } from './store';
import One from './pages/one';

import './index.css';
// https://www.thehalftimecode.com/sharing-tailwind-css-and-components-across-apps-in-a-monorepo/
import '@example-lib/bar/styles.css';


const BarRoutes = React.lazy(() => import(
  /* webpackChunkName: "bar" */
  '@example-lib/bar'
).then(
  ({ routes }) => ({ default: () => useRoutes(routes) })
));

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={worldStore}>
        <InjectReducer>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/world/*" element={<One />} />
            </Routes>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <BarRoutes />
          </Suspense>
        </InjectReducer>
      </Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('world-root')!).render(<App />);
