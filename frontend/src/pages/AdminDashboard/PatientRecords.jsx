import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa'; // Icons for status and search
import { MdEdit } from 'react-icons/md'; // Icon for edit actions
import Swal from 'sweetalert2'; // Import SweetAlert2

const PatientRecords = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [usersPerPage] = useState(5); // Users per page

  // Fetch user data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to toggle user status (Active/Inactive)
  const toggleStatus = async (id, currentStatus) => {
    try {
      console.log(id)
      const response = await axios.put(`http://localhost:5000/api/users/admin/${id}/status`, {
        isActive: !currentStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === id ? { ...user, isactive: !currentStatus } : user
        )
      );

      // Display SweetAlert2 message
      Swal.fire({
        title: `User ${!currentStatus ? 'activated' : 'deactivated'}!`,
        text: `The user has been ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
        icon: !currentStatus ? 'success' : 'warning',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating user status:', error);

      // Show error alert if the status update fails
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the user status.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
        <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Patient Records</h2>

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
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Phone</th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Status</th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user.email}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-gray-700">{user.name}</td>
                    <td className="py-4 px-6 text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 text-gray-700">{user.phone || 'N/A'}</td>
                    <td className="py-4 px-6 text-gray-700 flex items-center">
                      {user.isactive ? (
                        <FaCheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-2" />
                      )}
                      {user.isactive ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-4 px-6 border-b">
                      <button
                        onClick={() => toggleStatus(user.user_id, user.isactive)}
                        className={`py-2 px-4 flex items-center rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${
                          user.isactive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                      >
                        <MdEdit className="mr-2" />
                        {user.isactive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                    No users found
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

export default PatientRecords;
