import React, { useEffect, useState } from 'react';
import TaskItem from '../task-item/Taskitem';
import AddOrEditTask from '../add-task/AddOrEditTask';
import "./TaskList.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../navbar/Navbar.css';

const TaskList = () => {

    const [isTaskFilterDropdownOpen, setIsTaskFilterDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([])
    const [showAddPopup, setShowAddPopup] = useState(false);

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const url = `http://localhost:8000/alltasks/`;
            const result = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(result?.data);
            setFilteredTasks(result?.data);
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
                setFilteredTasks(tasks);
                break;

            case 'completed':
                setFilteredTasks(tasks.filter(task => task.status === true));
                break;
            case "pending":
                setFilteredTasks(tasks.filter(task => task.status === false));
                break;

        }
        setIsTaskFilterDropdownOpen(false);
    }
    return <div className="task-list-container">
        <div className='d-flex justify-content-end gap-2'>
            <input
                type="text"
                className="search-bar"
                placeholder="Search Tasks..."
                onChange={(e) => onSearch(e.target.value)}
            />
            <div className="dropdown">
                <button
                    className="dropdown-btn"
                    onClick={() => setIsTaskFilterDropdownOpen(!isTaskFilterDropdownOpen)}>
                    Filter Status ▼
                </button>
                {isTaskFilterDropdownOpen && (
                    <div className="dropdown-content">
                        <button onClick={() => handleFilterClick('all')}>All</button>
                        <button onClick={() => handleFilterClick('completed')}>Completed</button>
                        <button onClick={() => handleFilterClick('pending')}>Pending</button>
                    </div>
                )}
            </div>
            <button className='btn btn-primary mt-1' onClick={handleShowAddTaskPopup}>Add Task</button>
        </div>


        <div className="task-list">
            {filteredTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    refetch={getAllTasks}
                />
            ))}
        </div>
        {showAddPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} />}
    </div>
};

export default TaskList;
