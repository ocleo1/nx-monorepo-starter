import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '@example-lib/utils';


export const fetchOneName = createAsyncThunk<{ name: string }, void, { rejectValue: string }>(
  'foo/one/fetchOneName',
  async (_, { rejectWithValue }) => {
    const data = await getFooOne();
    if (data.error) {
      return rejectWithValue(data.error);
    }
    return data.result;
  }
);

async function getFooOne() {
  const resp = await axiosInst.get('/foo/one');
  return resp.data;
}
