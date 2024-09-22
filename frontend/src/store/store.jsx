import { configureStore } from "@reduxjs/toolkit";
import timeSlotsReducer from "./slices/timeSlotsSlice";
import authReducer from "./slices/authSlice";
import doctorAuthSlice from "./slices/doctorAuthSlice";
import doctorSlice from "./slices/doctorSlice";
import appointmentsReducer from './slices/appointmentsSlice'; // Adjust the path as needed


const store = configureStore({
  reducer: {
    auth: authReducer,
    timeSlots: timeSlotsReducer,
    doctorAuth: doctorAuthSlice,
    doctor: doctorSlice,
    appointments: appointmentsReducer,

  },
});

export default store;
