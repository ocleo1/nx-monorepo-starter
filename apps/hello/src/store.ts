import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducerMap } from '@example-lib/redux';

import type { Store } from '@reduxjs/toolkit';
import type { UserShapeMap, UserReducerMap } from '@example-lib/redux';
import type { FooShapeMap, FooReducerMap } from '@example-lib/foo';


export const helloStore = configureStore({
  reducer: { ...userReducerMap }
});

export function injectModuleReducer(newReducerMap: ModuleReducerMap): Store<HelloShapeMap> {
  const reducerMap = { ...userReducerMap, ...newReducerMap };
  helloStore.replaceReducer(combineReducers(reducerMap));
  return helloStore as Store<HelloShapeMap>;
}


export type HelloShape = ReturnType<typeof helloStore.getState>;
export type HelloDispatch = typeof helloStore.dispatch;

export type HelloReducerMap = UserReducerMap & Required<{
  [k in keyof ModuleReducerMap]: ModuleReducerMap[k]
}>;

export type ModuleReducerMap = Partial<FooReducerMap>;

export type HelloShapeMap = UserShapeMap & Required<{
  [k in keyof ModuleShapeMap]: ModuleShapeMap[k]
}>;

export type ModuleShapeMap = Partial<FooShapeMap>;
