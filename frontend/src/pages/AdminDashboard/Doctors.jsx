import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa'; // Icons for status and search
import { MdEdit } from 'react-icons/md'; // Icon for edit actions
import Swal from 'sweetalert2'; // SweetAlert2 for alerts
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [doctorsPerPage] = useState(5); // Doctors per page

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors/admin');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const toggleActiveStatus = async (doctorId, isActive) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/doctors/admin/${doctorId}/status`, {
        isActive: !isActive,
      });

      // Update the doctor's status locally
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.doctor_id === doctorId ? { ...doctor, isactive: !isActive } : doctor
        )
      );

      // Show SweetAlert based on status
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

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current doctors for the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Doctors</h2>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-4 left-3 text-gray-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-indigo-700">
              <tr>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Name</th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Email</th>
                {/* <th className="py-4 px-6 border-b font-semibold text-left text-white">Contact Number</th> */}
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Description</th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Status</th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDoctors.length > 0 ? (
                currentDoctors.map((doctor) => (
                  <tr key={doctor.doctor_id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="py-4 px-6 text-gray-700">{doctor.name}</td>
                    <td className="py-4 px-6 text-gray-700">{doctor.email}</td>
                    {/* <td className="py-4 px-6 text-gray-700">{doctor.contact_number}</td> */}
                    <td className="py-4 px-6 text-gray-700">{doctor.description}</td>
                    <td className="py-4 px-6 text-gray-700 flex items-center">
                      {doctor.isactive ? (
                        <FaCheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-2" />
                      )}
                      {doctor.isactive ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-4 px-6 border-b">
                      <button
                        onClick={() => toggleActiveStatus(doctor.doctor_id, doctor.isactive)}
                        className={`py-2 px-4 flex items-center rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${
                          doctor.isactive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                      >
                        <MdEdit className="mr-2" />
                        {doctor.isactive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded ${
              currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
