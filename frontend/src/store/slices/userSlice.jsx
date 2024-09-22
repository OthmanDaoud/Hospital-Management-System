// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Existing login and register actions...

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "An error occurred");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, email, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        { name, email, currentPassword, newPassword },
        { withCredentials: true }
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "An error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Existing reducers...
  },
  extraReducers: (builder) => {
    // Existing extra reducers...

    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export actions and reducer...

export default authSlice.reducer;