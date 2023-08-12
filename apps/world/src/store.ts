import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducerMap } from '@example-lib/redux';

import type { Store } from '@reduxjs/toolkit';
import type { UserShapeMap, UserReducerMap } from '@example-lib/redux';
import type { BarShapeMap, BarReducerMap } from '@example-lib/bar';


export const worldStore = configureStore({
  reducer: { ...userReducerMap }
});

export function injectModuleReducer(newReducerMap: ModuleReducerMap): Store<WorldShapeMap> {
  const reducerMap = { ...userReducerMap, ...newReducerMap };
  worldStore.replaceReducer(combineReducers(reducerMap));
  return worldStore as Store<WorldShapeMap>;
}


export type WorldShape = ReturnType<typeof worldStore.getState>;
export type WorldDispatch = typeof worldStore.dispatch;

export type WorldReducerMap = UserReducerMap & Required<{
  [k in keyof ModuleReducerMap]: ModuleReducerMap[k]
}>;

export type ModuleReducerMap = Partial<BarReducerMap>;

export type WorldShapeMap = UserShapeMap & Required<{
  [k in keyof ModuleShapeMap]: ModuleShapeMap[k]
}>;

export type ModuleShapeMap = Partial<BarShapeMap>;
