import { createSlice } from '@reduxjs/toolkit';
import { fetchOneName } from './thunks';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: OneState = {
  name: null,
  color: null,
  loading: false
};

const slice = createSlice({
  name: 'foo/one',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOneName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneName.fulfilled, (state, action: PayloadAction<{ name: string }>) => {
        state.name = action.payload.name;
      })
      .addCase(fetchOneName.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { setColor } = slice.actions;

export default slice.reducer;

// ======
// Types
// ======

export interface OneState {
  name: string | null;
  color: string | null;
  error?: string;
  loading: boolean;
}
