import React, { useEffect, useState } from 'react';
import TaskItem from '../task-item/Taskitem';
import AddOrEditTask from '../add-or-edit-task/AddOrEditTask';
import "./TaskList.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../navbar/Navbar.css';
import Config from '../../../Config';

const TaskList = () => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const [isTaskFilterDropdownOpen, setIsTaskFilterDropdownOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [filterValues, setFilterValues] = useState({
        searchVal: '',
        statusFilterVal: 'all'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getAllTasks();
    }, [currentPage, filterValues]);

    const getAllTasks = async () => {
        try {
            let queryParams = [];
            if (filterValues.searchVal) {
                queryParams.push(`q=${filterValues.searchVal.toLowerCase()}`);
            }
            if (filterValues.statusFilterVal !== 'all') {
                const status = filterValues.statusFilterVal === 'completed' ? 'True' : 'False';
                queryParams.push(`status=${status}`);
            }
            queryParams.push(`page=${currentPage}`);
            const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

            const url = `${Config.API_BASE_URL}/alltasks/${queryString}`;
            const result = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks(result?.data?.tasks || []);
            setTotalPages(result?.data?.total_pages || 1);
        }
        catch (err) {
            if (err?.status === 401) {
                navigate('/login')
            }
        }
    }

    const handleShowAddTaskPopup = () => {
        setShowAddPopup(true)
    }

    const handleHideAddTaskPopup = (isTaskCreated = false) => {
        setShowAddPopup(false);
        if (isTaskCreated) {
            getAllTasks();
        }
    }

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <div className="task-list-container">
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

            <div className="row task-list">
                {tasks.length === 0 ? (
                    <div>No Tasks</div>
                ) : (
                    tasks.map(task => (
                        <div className="col" key={task.id}>
                            <TaskItem
                                task={task}
                                refetch={getAllTasks}
                            />
                        </div>
                    ))
                )}
            </div>

            <div className="pagination-controls">
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span style={{ lineHeight: 2 }}>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            {showAddPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} />}
        </div>
    );
};

export default TaskList;
