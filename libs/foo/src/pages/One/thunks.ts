import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@example-lib/utils';


export const fetchOneName = createAsyncThunk<
{ name: string },
void,
{ rejectValue: string }
>('foo/one/fetchOneName', async (_, { rejectWithValue }) => {
  const resp = await get('/foo/one');
  if (resp.error) {
    return rejectWithValue(resp.Error);
  }
  return resp.result;
});
