import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fooReducerMap } from '@example-lib/foo';
import { injectModuleReducer } from '../store';

import type { ReactNode } from 'react';

export function InjectReducer({ children }: InjectReducerProps) {
  const location = useLocation();
  const { pathname } = location;

  return useMemo(() => {
    if (/^\/foo$/.test(pathname) || /^\/foo\//.test(pathname)) {
      injectModuleReducer(fooReducerMap);
    }
    return <>{children}</>;
  }, [pathname]);
}

interface InjectReducerProps {
  children: ReactNode;
}
