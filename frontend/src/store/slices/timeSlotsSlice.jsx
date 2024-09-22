import { createSlice } from "@reduxjs/toolkit";

const timeSlotsSlice = createSlice({
  name: "timeSlots",
  initialState: {
    dateTimeSlots: {}, // Maps dates to their selected time slots
  },
  reducers: {
    setTimeSlots: (state, action) => {
      const { date, slots } = action.payload;
      state.dateTimeSlots[date] = slots; // Save slots for the specific date
    },
    getTimeSlots: (state, action) => {
      const date = action.payload;
      return state.dateTimeSlots[date] || []; // Retrieve slots for the specific date
    },
  },
});

export const { setTimeSlots, getTimeSlots } = timeSlotsSlice.actions;
export default timeSlotsSlice.reducer;
