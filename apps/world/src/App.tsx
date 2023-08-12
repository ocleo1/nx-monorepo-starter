import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { InjectReducer } from './HOC/InjectReducer';
import { worldStore } from './store';

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
              <Route path="/bar/*" element={<BarRoutes />} />
            </Routes>
          </Suspense>
        </InjectReducer>
      </Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('world-root'));
