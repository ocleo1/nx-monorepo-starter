import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '@example-lib/utils';


export const fetchOneName = createAsyncThunk<{ name: string }, void, { rejectValue: string }>(
  'bar/one/fetchOneName',
  async (_, { rejectWithValue }) => {
    const data = await getBarOne();
    if (data.error) {
      return rejectWithValue(data.error);
    }
    return data.result;
  }
);

async function getBarOne() {
  const resp = await axiosInst.get('/bar/one');
  return resp.data;
}
