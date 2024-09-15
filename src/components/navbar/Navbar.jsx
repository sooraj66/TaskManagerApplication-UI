import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onSearch, onFilter }) => {

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
    </nav>
  );
};

export default Navbar;
