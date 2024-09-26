import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments } from "../../store/slices/userSlice";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AppointmentUser = () => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.profile);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (status === "idle" || !status) {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 mt-12 pb-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Appointments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments?.map((appointment) => (
          <div
            key={appointment.appointment_id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedAppointment(appointment)}
          >
            <div className="bg-blue-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    {new Date(
                      appointment.appointment_date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{appointment.appointment_time}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div
                className={`flex items-center ${getStatusColor(
                  appointment.status
                )}`}
              >
                {getStatusIcon(appointment.status)}
                <span className="ml-2 font-semibold">{appointment.status}</span>
              </div>
              {appointment.notes && (
                <p className="mt-2 text-gray-600 truncate">
                  {appointment.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Appointment Details
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {new Date(
                    selectedAppointment.appointment_date
                  ).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Time: {selectedAppointment.appointment_time}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {selectedAppointment.status}
                </p>
                {selectedAppointment.notes && (
                  <p className="text-sm text-gray-500 mt-2">
                    Notes: {selectedAppointment.notes}
                  </p>
                )}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentUser;
