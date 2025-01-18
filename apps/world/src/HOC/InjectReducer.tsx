import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { barReducerMap } from '@example-lib/bar';
import { isSamePrefix } from '@example-lib/utils';
import { injectModuleReducer } from '../store';

import type { ReactNode } from 'react';

export default function InjectReducer({ children }: InjectReducerProps) {
  const location = useLocation();
  const { pathname } = location;
  const prevPathname = useRef<string>('');

  useEffect(() => {
    if (isSamePrefix(pathname, 'bar') && !isSamePrefix(prevPathname.current, 'bar')) {
      injectModuleReducer(barReducerMap);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

interface InjectReducerProps {
  children: ReactNode;
}
