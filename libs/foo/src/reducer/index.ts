import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducerMap } from '@example-lib/redux';
import commonReducer from './slice';
import oneReducer from '../pages/one/slice';

import type { Reducer } from '@reduxjs/toolkit';
import type { CommonState } from './slice';
import type { OneState } from '../pages/one/slice';


const fooReducer: FooReducer = combineReducers({
  common: commonReducer,
  one: oneReducer
});

export const fooReducerMap: FooReducerMap = {
  foo: fooReducer
};

// ======
// Types
// ======

export interface FooReducerMap {
  foo: FooReducer;
}

export type FooReducer = Reducer<FooShape>;

export interface FooShapeMap {
  foo: FooShape;
}

export interface FooShape {
  common: CommonState;
  one: OneState;
}

// Only for RootState and AppDispatch types generation
const store = configureStore({
  reducer: { ...userReducerMap, ...fooReducerMap }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
