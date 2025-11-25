import React from 'react';
import { removeToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigator = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigator('/login');
  };

  return (
    <button className="btn btn-light-soft btn-pill" style={{color:'white'}}onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
