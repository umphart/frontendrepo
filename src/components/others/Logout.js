import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(true); // To show loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication state from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('staffName');
    localStorage.removeItem('staffID');
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('studentID');
    localStorage.removeItem('name');
    localStorage.removeItem('section');
    localStorage.removeItem('class');
    localStorage.removeItem('email');
    localStorage.removeItem('gender');
    localStorage.removeItem('department');
    localStorage.removeItem('phone');
    localStorage.removeItem('dob');
    localStorage.removeItem('guidanceName');
    localStorage.removeItem('guidanceContact');

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      // Redirect to login page after 1 second
      navigate('/login');
    }, 1000);
  }, [navigate]);

  // Internal styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  };

  const loaderStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  };

  const messageStyle = {
    fontSize: '18px',
    color: '#333',
  };

  // Keyframe for spinner animation (can be defined within the component)
  const spinKeyframeStyle = {
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <div style={loaderStyle}></div>  // Show spinner when loading
      ) : (
        <p style={messageStyle}>You have been logged out successfully.</p>
      )}

      {/* Inject the keyframes for spinning animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Logout;
