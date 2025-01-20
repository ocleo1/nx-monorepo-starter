import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';


const initialState: CommonState = {
  name: null
};

export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  }
});

export const { setName } = common.actions;

export default common.reducer;

// ======
// Types
// ======

export interface CommonState {
  name: string | null;
}
