import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInst } from '@example-lib/utils';


export const getUser = createAsyncThunk(
  'user/info',
  async () => {
    return await getUserInfo();
  }
);

async function getUserInfo() {
  const resp = await axiosInst.get('/user/info');
  return resp.data;
}
