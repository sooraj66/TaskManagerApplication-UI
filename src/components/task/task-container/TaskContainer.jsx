import React from 'react'
import './TaskContainer.css'
import TaskList from "../task-list/TaskList"
import Navbar from '../../navbar/Navbar';


function TaskContainer() {

    return (
        <>
            <Navbar />
            <div className="task-list-container">
                <TaskList />
            </div>
        </>
    )
}

export default TaskContainer