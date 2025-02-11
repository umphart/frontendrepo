import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  FaSignOutAlt, FaTachometerAlt, FaBars, FaUserCircle, FaClipboardList,FaEdit, FaEye, FaReceipt, FaBookOpen } from 'react-icons/fa';

const StaffSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={sidebarStyle(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsHovered(!isHovered)}
        style={toggleButtonStyle}
      >
        <FaBars />
      </button>

      <div style={isHovered ? { display: 'block' } : { display: 'none' }}>
        <h3 style={headerStyle}>STAFF</h3>
        <ul style={ulStyle}>
          <SidebarItem to="/staff" icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarItem to="/staff/staff-profile" icon={<FaUserCircle />} text="Profile" />
          <SidebarItem to="/staff/sections" icon={<FaClipboardList />} text="Section and Classes" />
          <SidebarItem to="/staff/staff-section" icon={<FaSave />} text="Sections" />
          <SidebarItem to="/staff/class-staff" icon={<FaBookOpen />} text="Classes" />
          <SidebarItem to="/staff/exam-report" icon={<FaReceipt />} text="Exams and Report" />
          <SidebarItem to="/staff/exam-modal" icon={<FaEdit />} text="Add Exam" />
          <SidebarItem to="/staff/view-modal" icon={<FaEye />} text="View Report" />
          
          <SidebarItem to="/staff/view-result" icon={<FaEdit />} text="Student Result" />
          <SidebarItem to="/staff/logout" icon={<FaSignOutAlt />} text="Logout" />
        </ul>
      </div>
    </div>
  );
};

// Sidebar styles with dynamic width and background color based on hover state
const sidebarStyle = (isHovered) => ({
  width: isHovered ? '200px' : '50px',
  height: '100vh',
  background: isHovered ? '#2c3e50' : 'transparent',  // Transparent when minimized
  color: '#fff',
  padding: '5px',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: 'width 0.3s ease, background 0.3s ease', // Add transition for background
  overflow: 'hidden',
  zIndex: 1000,
});
const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ecf0f1',
  marginTop: '20px',
};

const ulStyle = {
  listStyleType: 'none',
  paddingLeft: 0,
};

const liStyle = {
  marginBottom: '1px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ecf0f1',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 10px',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
};

const iconStyle = {
  marginRight: '15px',
  fontSize: '20px',
};

const SidebarItem = ({ to, icon, text }) => (
  <li style={liStyle}>
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => e.target.style.background = '#2c3e50'}
      onMouseLeave={(e) => e.target.style.background = 'transparent'}
    >
      <span style={iconStyle}>{icon}</span>
      {text && <span>{text}</span>}
    </Link>
  </li>
);

const toggleButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '20px',
  position: 'absolute',
  top: '20px',
  left: '2px',
  cursor: 'pointer',
};

export default StaffSidebar;
