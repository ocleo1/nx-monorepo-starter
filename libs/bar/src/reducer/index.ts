import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducerMap } from '@example-lib/redux';
import commonReducer from './slice';
import oneReducer from '../pages/One/slice';

import type { Reducer } from '@reduxjs/toolkit';
import type { CommonState } from './slice';
import type { OneState } from '../pages/One/slice';


const barReducer: BarReducer = combineReducers({
  common: commonReducer,
  one: oneReducer
});

export const barReducerMap: BarReducerMap = {
  bar: barReducer
};

// ======
// Types
// ======

export interface BarReducerMap {
  bar: BarReducer;
}

export type BarReducer = Reducer<BarShape>;

export interface BarShapeMap {
  bar: BarShape;
}

export interface BarShape {
  common: CommonState;
  one: OneState;
}

// Only for RootState and AppDispatch types generation
const store = configureStore({
  reducer: { ...userReducerMap, ...barReducerMap }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
