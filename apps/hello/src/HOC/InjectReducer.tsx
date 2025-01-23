import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isSamePrefix } from '@example-lib/utils';
import { FOO_PREFIX } from '@example-lib/foo';
import { injectModuleReducer } from '../store';

import type { ReactNode } from 'react';

export default function InjectReducer({ children }: InjectReducerProps) {
  const location = useLocation();
  const { pathname } = location;
  const prevPathname = useRef<string>('');

  useEffect(() => {
    if (isSamePrefix(pathname, FOO_PREFIX) && !isSamePrefix(prevPathname.current, FOO_PREFIX)) {
      import(
        /* webpackChunkName: "foo" */
        '@example-lib/foo'
      ).then(
        ({ fooReducerMap }) => injectModuleReducer(fooReducerMap)
      );
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

interface InjectReducerProps {
  children: ReactNode;
}
