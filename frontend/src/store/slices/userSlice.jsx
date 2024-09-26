import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "An error occurred"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { name, email, currentPassword, newPassword },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        { name, email, currentPassword, newPassword },
        { withCredentials: true }
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "An error occurred"
      );
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/user/appointment`,
      { withCredentials: true }
    );
    console.log("fetchAppointments", response);

    return response.data;
  }
);

const userSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    appointments: [], // Initialized appointments array
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
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
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMessages } = userSlice.actions;
export default userSlice.reducer;
