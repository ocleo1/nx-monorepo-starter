import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { barReducerMap } from '@example-lib/bar';
import { injectModuleReducer } from '../store';

import type { ReactNode } from 'react';

export function InjectReducer({ children }: InjectReducerProps) {
  const location = useLocation();
  const { pathname } = location;

  return useMemo(() => {
    if (/^\/bar$/.test(pathname) || /^\/bar\//.test(pathname)) {
      injectModuleReducer(barReducerMap);
    }
    return <>{children}</>;
  }, [pathname]);
}

interface InjectReducerProps {
  children: ReactNode;
}
