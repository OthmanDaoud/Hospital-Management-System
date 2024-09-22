import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorProfile,
  updateDoctorProfile,
} from "../../store/slices/doctorSlice";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.doctor || []);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // For the current password
  const [newPassword, setNewPassword] = useState(""); // For the new password

  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDoctorProfile({ email, oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        alert("Failed to update profile: " + error.message);
      });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      <div className="mb-4">
        <p>
          <span className="font-semibold">Name:</span> {profile.name}
        </p>
        <p>
          <span className="font-semibold">Years of Experience:</span>{" "}
          {profile.years_of_experience}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${profile.price}
        </p>
        <p>
          <span className="font-semibold">Contact Number:</span>{" "}
          {profile.contact_number}
        </p>
        <p>
          <span className="font-semibold">Availability:</span>{" "}
          {profile.availability}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
