import React, { useEffect, useState } from 'react';
import './TaskContainer.css'
import TaskList from "../task-list/TaskList";
import Navbar from '../../navbar/Navbar';
import TaskFilter from '../task-filters/TaskFilter';
import AddOrEditTask from '../add-or-edit-task/AddOrEditTask';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../navbar/Navbar.css';
import Config from '../../../Config';


function TaskContainer() {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <>
            <Navbar />
            <div className="task-list-container">
                <div className="task-list-content">
                    <TaskFilter setFilterValues={setFilterValues} filterValues={filterValues} setCurrentPage={setCurrentPage} handleShowAddTaskPopup={handleShowAddTaskPopup} />
                    <TaskList tasks={tasks} refetch={getAllTasks} />
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                
                {showAddPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} />}
            </div>
        </>
    )
}

export default TaskContainer;
