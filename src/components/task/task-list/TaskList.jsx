import React, { useEffect, useState } from 'react';
import TaskItem from '../task-item/Taskitem';
import AddOrEditTask from '../add-task/AddOrEditTask';
import "./TaskList.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
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
            setTasks(result?.data)
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
    return <div className="task-list-container">
        <button className='btn btn-primary mt-1' onClick={handleShowAddTaskPopup}>Add Task</button>

        <div className="task-list">
            {tasks.map(task => (
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
