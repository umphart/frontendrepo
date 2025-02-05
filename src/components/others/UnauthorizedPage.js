import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
};

export default UnauthorizedPage;
