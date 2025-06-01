import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    await axios.get('http://localhost:5000/api/users/logout', { withCredentials: true });
    return null;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Logout failed");
  }
});


const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // 👈 store user
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
