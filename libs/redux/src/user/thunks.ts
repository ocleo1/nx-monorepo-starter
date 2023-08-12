import { createAsyncThunk } from '@reduxjs/toolkit';

import { get } from '@example-lib/utils';

export const getUser = createAsyncThunk(
  'user/info',
  async () => {
    return await get('/user/info');
  }
);
