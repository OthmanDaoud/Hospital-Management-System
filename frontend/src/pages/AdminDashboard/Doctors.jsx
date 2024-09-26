import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaUserMd, FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { motion, AnimatePresence } from 'framer-motion';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/admin');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const toggleActiveStatus = async (doctorId, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/doctor/admin/${doctorId}/status`, {
        isActive: !isActive,
      });

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.doctor_id === doctorId ? { ...doctor, isactive: !isActive } : doctor
        )
      );

      Swal.fire({
        icon: isActive ? 'error' : 'success',
        title: isActive ? 'Doctor Account Deactivated' : 'Doctor Account Activated',
        text: `The doctor account has been ${isActive ? 'deactivated' : 'activated'} successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error toggling doctor status:', error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 to-purple-100"
    >
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-8 text-indigo-800 text-center">Doctors Dashboard</h2>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-indigo-500 text-xl" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th className="py-4 px-6 text-left text-white font-semibold">Name</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Email</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentDoctors.length > 0 ? (
                  currentDoctors.map((doctor) => (
                    <motion.tr
                      key={doctor.email}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-indigo-50 transition-colors duration-300"
                    >
                      <td className="py-4 px-6 text-gray-800 flex items-center">
                        <FaUserMd className="text-indigo-500 mr-3" />
                        {doctor.name}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        <div className="flex items-center">
                          <FaEnvelope className="text-indigo-500 mr-3" />
                          {doctor.email}
                        </div>
                      </td>
                      
                      <td className="py-4 px-6 text-gray-800">
                        <span className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${doctor.isactive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {doctor.isactive ? (
                            <FaCheckCircle className="mr-2" />
                          ) : (
                            <FaTimesCircle className="mr-2" />
                          )}
                          {doctor.isactive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleActiveStatus(doctor.doctor_id, doctor.isactive)}
                          className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center ${doctor.isactive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        >
                          <MdEdit className="mr-2" />
                          {doctor.isactive ? 'Deactivate' : 'Activate'}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 px-6 text-center text-gray-500 text-lg">
                      No doctors found
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-6 rounded-full font-semibold ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
          >
            Previous
          </motion.button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-6 rounded-full font-semibold ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;