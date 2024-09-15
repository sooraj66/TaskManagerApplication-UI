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

    const [isTaskFilterDropdownOpen, setIsTaskFilterDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([])
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [filterValues, setFilterValues] = useState({
        searchVal: '',
        statusFilterVal: 'all'
    })

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        const filteredTask = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(filterValues.searchVal.toLowerCase());
            const matchesStatus =
                filterValues.statusFilterVal === 'all' ||
                (filterValues.statusFilterVal === 'completed' && task.status === true) ||
                (filterValues.statusFilterVal === 'pending' && task.status === false);

            return matchesSearch && matchesStatus;
        });

        setFilteredTasks(filteredTask);
    }, [filterValues])

    const getAllTasks = async () => {
        try {
            const url = `${Config.API_BASE_URL}/alltasks/`;
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
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'all' }))
                break;
            case 'completed':
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'completed' }))
                break;
            case "pending":
                setFilterValues(prevVal => ({ ...prevVal, statusFilterVal: 'pending' }))
                break;
        }
        setIsTaskFilterDropdownOpen(false);
    }


    return <div className="task-list-container">
        <div className="d-flex justify-content-end gap-2 mb-3">
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
                        <button className={filterValues.statusFilterVal == 'all'? 'active' : ''} onClick={() => handleFilterClick('all')}>All</button>
                        <button className={filterValues.statusFilterVal == 'completed'? 'active' : ''} onClick={() => handleFilterClick('completed')}>Completed</button>
                        <button className={filterValues.statusFilterVal == 'pending'? 'active' : ''} onClick={() => handleFilterClick('pending')}>Pending</button>
                    </div>
                )}
            </div>
            <button className="btn btn-primary" onClick={handleShowAddTaskPopup}>Add Task</button>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 task-list">
            {tasks.length === 0 ? <div>No Tasks</div> :
                (filteredTasks.length == 0 ?
                    <div>No {filterValues.statusFilterVal} Task</div> :
                    filteredTasks.map(task => (
                        <div className="col" key={task.id}>
                            <TaskItem
                                task={task}
                                refetch={getAllTasks}
                            />
                        </div>
                    )))}
        </div>

        {showAddPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} />}
    </div>

};

export default TaskList;
