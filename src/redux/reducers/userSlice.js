import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asinxron istifadəçini getirmək (token ilə)
export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const token = localStorage.getItem('accessToken');
  const res = await axios.get('http://localhost:5000/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
