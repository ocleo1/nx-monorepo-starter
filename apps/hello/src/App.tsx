import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import InjectReducer from './HOC/InjectReducer';
import { helloStore } from './store';
import One from './pages/one';

import './index.css';
// https://www.thehalftimecode.com/sharing-tailwind-css-and-components-across-apps-in-a-monorepo/
import '@example-lib/foo/styles.css';


const FooRoutes = React.lazy(() => import(
  /* webpackChunkName: "foo" */
  '@example-lib/foo'
).then(
  ({ routes }) => ({ default: () => useRoutes(routes) })
));

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={helloStore}>
        <InjectReducer>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/hello/*" element={<One />} />
            </Routes>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <FooRoutes />
          </Suspense>
        </InjectReducer>
      </Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('hello-root')!).render(<App />);
