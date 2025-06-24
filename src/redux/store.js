import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'; // ← Ən çox səhv burada olur
import messageReducer from './reducers/messageSlice'; // varsa

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer, // varsa
  },
});

export default store


