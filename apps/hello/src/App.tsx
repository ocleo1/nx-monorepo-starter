import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { InjectReducer } from './HOC/InjectReducer';
import { helloStore } from './store';

import './index.css';
import '@example-lib/foo/dist/styles/foo.scss';


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
              <Route path="/foo/*" element={<FooRoutes />} />
            </Routes>
          </Suspense>
        </InjectReducer>
      </Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('hello-root')!).render(<App />);
