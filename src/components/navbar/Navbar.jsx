import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onSearch, onFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterClick = (status) => {
    onFilter(status);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search Tasks..." 
        onChange={(e) => onSearch(e.target.value)} 
      />
      <div className="dropdown">
        <button 
          className="dropdown-btn" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Filter Status ▼
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <button onClick={() => handleFilterClick('all')}>All</button>
            <button onClick={() => handleFilterClick('completed')}>Completed</button>
            <button onClick={() => handleFilterClick('pending')}>Pending</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
