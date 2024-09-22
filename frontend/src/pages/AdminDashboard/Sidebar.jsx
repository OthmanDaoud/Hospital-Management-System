import React from 'react';
import { Home, Users, Calendar, Mail, LogOut , Hospital } from 'lucide-react'; // Added LogOut icon
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import { FaUserInjured } from 'react-icons/fa6';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here, like clearing tokens, etc.
    // After that, redirect the user to the login page
    // navigate('/login'); // Navigate to login page after logout
  };

  return (
    <aside className="bg-indigo-700 text-white w-64 min-h-screen p-4">
      {/* Admin title with icon */}
      <div className="mb-8 flex items-center space-x-3"> {/* Flex for alignment and spacing */}
        <Hospital className="text-white w-8 h-8" /> {/* Adjusted icon size */}
        <h2 className="text-3xl font-bold text-white">Admin</h2>
      </div>

      <nav>
        <ul>
          <SidebarItem icon={Home} text="Overview" to="/admin" />
          <SidebarItem icon={Users} text="Patient Records" to="/admin/patient-records" />
          <SidebarItem icon={Users} text="Doctors" to="/admin/doctors" />
          <SidebarItem icon={Calendar} text="Appointments" to="/admin/appointments" />
          <SidebarItem icon={Mail} text="Messages" to="/admin/messages" />
        </ul>
      </nav>

      {/* Logout button */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2  hover:bg-indigo-600 rounded text-white"
        >
          <LogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, text, to }) => (
  <li className="mb-4">
    <Link to={to} className="flex items-center p-2 hover:bg-indigo-600 rounded">
      <Icon className="mr-3" />
      <span>{text}</span>
    </Link>
  </li>
);

export default Sidebar;
