import { createSlice } from '@reduxjs/toolkit';

import { getUser } from './thunks';

import type { Reducer, PayloadAction } from '@reduxjs/toolkit';


const initialState: UserShape = {
  user: null
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.user = action.payload;
      });
  }
});

export const userReducerMap: UserReducerMap = {
  user: user.reducer
};

// ======
// Types
// ======

export interface UserReducerMap {
  user: UserReducer;
}

export type UserReducer = Reducer<UserShape>;

export interface UserShapeMap {
  user: UserShape;
}

export interface UserShape {
  user: string | null;
}
