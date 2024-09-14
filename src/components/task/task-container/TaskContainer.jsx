import React from 'react'
import './TaskContainer.css'
import TaskList from "../task-list/TaskList"
import Navbar from '../../navbar/Navbar';


function TaskContainer() {

    const searchTasks = (query) => {
        // setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())));
    };

    const filterTasks = (status) => {
        // if (status === 'all') {
        //     setFilteredTasks(tasks);
        // } else {
        //     setFilteredTasks(tasks.filter(task => task.status === status));
        // }
    };

    return (
        <div className="task-list-container">
            <Navbar onSearch={searchTasks} onFilter={filterTasks} />
            <TaskList />
        </div>
    )
}

export default TaskContainer