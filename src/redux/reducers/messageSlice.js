import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/messages';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (receiverId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API}/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Mesajlar alınmadı');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ receiverId, text }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        API,
        { receiverId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Mesaj göndərilə bilmədi');
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    items: {}, // hər istifadəçi üçün ayrıca mesaj listi
    loading: false,
    error: null,
  },
  reducers: {
    addMessageRealtime: (state, action) => {
      const { receiverId, senderId } = action.payload;
      const key = senderId; // mesajı göndərənin id-si ilə saxlayaq
      if (!state.items[key]) {
        state.items[key] = [];
      }
      state.items[key].push(action.payload);
    },
    clearMessages: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const receiverId = action.meta.arg;
        state.items[receiverId] = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { receiverId } = action.payload;
        if (!state.items[receiverId]) {
          state.items[receiverId] = [];
        }
        state.items[receiverId].push(action.payload);
      });
  },
});

export const { addMessageRealtime, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;

