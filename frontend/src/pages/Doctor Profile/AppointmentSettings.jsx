import React, { useState } from "react";

const AppointmentSettings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [appointmentDuration, setAppointmentDuration] = useState("30");
  const [repeatDays, setRepeatDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const handleRepeatDayChange = (day) => {
    setRepeatDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSaveAvailability = () => {
    console.log("Saving availability:", {
      selectedDate,
      startTime,
      endTime,
      appointmentDuration,
      repeatDays,
    });
    // Here you would typically send this data to your backend
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Appointment Duration
        </label>
        <select
          value={appointmentDuration}
          onChange={(e) => setAppointmentDuration(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Repeat on
        </label>
        <div className="space-y-2">
          {Object.entries(repeatDays).map(([day, checked]) => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleRepeatDayChange(day)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveAvailability}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Save Availability
      </button>
    </div>
  );
};

export default AppointmentSettings;
