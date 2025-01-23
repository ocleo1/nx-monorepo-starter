import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isSamePrefix } from '@example-lib/utils';
import { BAR_PREFIX } from '@example-lib/bar';
import { injectModuleReducer } from '../store';

import type { ReactNode } from 'react';

export default function InjectReducer({ children }: InjectReducerProps) {
  const location = useLocation();
  const { pathname } = location;
  const prevPathname = useRef<string>('');

  useEffect(() => {
    if (isSamePrefix(pathname, BAR_PREFIX) && !isSamePrefix(prevPathname.current, BAR_PREFIX)) {
      import(
        /* webpackChunkName: "bar" */
        '@example-lib/bar'
      ).then(
        ({ barReducerMap }) => injectModuleReducer(barReducerMap)
      );
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

interface InjectReducerProps {
  children: ReactNode;
}
