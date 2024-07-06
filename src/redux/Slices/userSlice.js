
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../services/oprations/userAPI"
import toast from 'react-hot-toast';


export const fetchUser = createAsyncThunk(
  'user/fetchUser',  // Action type string
  async (_, thunkAPI) => {
    const toastId = toast.loading("Loading...");
    try {
      const userData = await getUser()();
      toast.dismiss(toastId);
      return userData;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to fetch user data. Please log in again.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;