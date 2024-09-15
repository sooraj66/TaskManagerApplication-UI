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
        <>
            <Navbar onSearch={searchTasks} onFilter={filterTasks} />
            <div className="task-list-container">
                <TaskList />
            </div>
        </>
    )
}

export default TaskContainer