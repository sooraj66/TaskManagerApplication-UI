import React from 'react'
import './TaskContainer.css'
import TaskList from "../task-list/TaskList"
import Navbar from '../../navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <button className='btn btn-primary mt-1' onClick={() => addTask('New Task')}>Add Task</button>
            <TaskList />
        </div>
    )
}

export default TaskContainer