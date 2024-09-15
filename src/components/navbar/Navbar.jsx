import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('access_token');
    navigate('/login')

  }

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <button className='btn btn-warning text-white logout-btn' onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
