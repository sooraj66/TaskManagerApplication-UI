import React, { useState } from 'react';
import './TaskFilter.css';

function TaskFilter({ filterValues, setFilterValues, handleShowAddTaskPopup, setCurrentPage }) {
    const [isTaskFilterDropdownOpen, setIsTaskFilterDropdownOpen] = useState(false);

    const handleFilterClick = (selectedOption) => {
        switch (selectedOption) {
            case 'all':
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'all' }));
                break;
            case 'completed':
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'completed' }));
                break;
            case "pending":
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'pending' }));
                break;
        }
        setIsTaskFilterDropdownOpen(false);
        setCurrentPage(1);
    }

    return (
        <div className="d-flex justify-content-end gap-2 mb-3 task-list-main">
            <input
                type="text"
                className="search-bar form-control"
                style={{ width: 'inherit' }}
                placeholder="Search Tasks..."
                onChange={(e) => setFilterValues(prevVal => ({ ...prevVal, searchVal: e.target.value }))}
            />
            <div className="dropdown">
                <button
                    className="dropdown-btn"
                    onClick={() => setIsTaskFilterDropdownOpen(!isTaskFilterDropdownOpen)}>
                    Filter Status
                </button>
                {isTaskFilterDropdownOpen && (
                    <div className="dropdown-content">
                        <button className={filterValues.statusFilterVal === 'all' ? 'active' : ''} onClick={() => handleFilterClick('all')}>All</button>
                        <button className={filterValues.statusFilterVal === 'completed' ? 'active' : ''} onClick={() => handleFilterClick('completed')}>Completed</button>
                        <button className={filterValues.statusFilterVal === 'pending' ? 'active' : ''} onClick={() => handleFilterClick('pending')}>Pending</button>
                    </div>
                )}
            </div>
            <button className="btn btn-primary" onClick={handleShowAddTaskPopup}>Add Task</button>
        </div>
    )
}

export default TaskFilter