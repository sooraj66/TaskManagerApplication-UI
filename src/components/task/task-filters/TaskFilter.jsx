import React, { useState } from 'react';
import './TaskFilter.css';

function TaskFilter({ setFilterValues, handleShowAddTaskPopup }) {
    const [isTaskFilterDropdownOpen, setIsTaskFilterDropdownOpen] = useState(false);

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