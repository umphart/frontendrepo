import React, { useState } from 'react';  
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaUserEdit,
  FaBookOpen,
  FaReceipt,
  FaEye,
  FaUserCheck,
} from 'react-icons/fa'; // Adjusted icon imports

// Sidebar component
const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false); // State to manage the hover effect
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to toggle sidebar on smaller screens

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      style={{
        ...sidebarStyle(isHovered),
        display: isSidebarVisible ? 'block' : 'none', // Hide sidebar on mobile
      }}
      onMouseEnter={() => setIsHovered(true)} // Expand when hovered
      onMouseLeave={() => setIsHovered(false)} // Collapse when unhovered
    >
      {/* Toggle Sidebar for Mobile */}
      <button
        onClick={toggleSidebarVisibility}
        style={toggleButtonStyle}
      >
        <FaBars />
      </button>

      {/* Sidebar Content */}
      <div style={isHovered ? { display: 'block' } : { display: 'none' }}>
        <h3 style={headerStyle}>Admin</h3>
        <ul style={ulStyle}>
          <SidebarItem to="/admin" icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarItem to="/admin/manage-students" icon={<FaUsers />} text="Manage Students" />
          <SidebarItem to="/admin/manage-staff" icon={<FaUserEdit />} text="Manage Staff" />
          <SidebarItem to="/admin/manage-section" icon={<FaClipboardList />} text="Manage Sections" />
          <SidebarItem to="/admin/class-section" icon={<FaBookOpen />} text="Classes" />
          <SidebarItem to="/admin/exam-report" icon={<FaReceipt />} text="Exams & Reports" />
          <SidebarItem to="/admin/exam-modal" icon={<FaUserCheck />} text="Add Exam" />
          <SidebarItem to="/admin/view-modal" icon={<FaEye />} text="View Report" />
          <SidebarItem to="/admin/record-nav" icon={<FaReceipt />} text="Exam Results" />
          <SidebarItem to="/admin/view-result" icon={<FaReceipt />} text="Check Results" />
          <SidebarItem to="/admin/logout" icon={<FaSignOutAlt />} text="Logout" />
        </ul>
      </div>
    </div>
  );
};

// Sidebar styles with dynamic width based on hover state
const sidebarStyle = (isHovered) => ({
  width: isHovered ? '200px' : '50px',
  height: '100vh',
  background: 'transparent', // Background is now transparent
  color: '#fff',
  padding: '5px',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  zIndex: 1000,
  transition: 'width 0.3s ease',
});

// Header style
const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ecf0f1',
};

// List style
const ulStyle = {
  listStyleType: 'none',
  paddingLeft: 0,
};

// List item style
const liStyle = {
  marginBottom: '10px',
};

// Link style
const linkStyle = {
  textDecoration: 'none',
  color: '#ecf0f1',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  padding: '5px 0px',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
};

// Icon style
const iconStyle = {
  marginRight: '10px',
  fontSize: '20px',
};

// SidebarItem component
const SidebarItem = ({ to, icon, text }) => (
  <li style={liStyle}>
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => (e.target.style.background = '#34495e')}
      onMouseLeave={(e) => (e.target.style.background = 'transparent')}
    >
      <span style={iconStyle}>{icon}</span>
      {text}
    </Link>
  </li>
);

// Toggle button style
const toggleButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '20px',
  position: 'absolute',
  top: '20px',
  left: '10px',
  cursor: 'pointer',
};

// Media Query: hide sidebar on smaller screens (mobile view)
const mediaQueryStyle = {
  '@media (max-width: 768px)': {
    sidebar: {
      display: 'none',
    },
    toggleButton: {
      display: 'block',
    },
  },
};

export default Sidebar;
