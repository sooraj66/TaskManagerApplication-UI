import React, { useEffect, useState } from 'react';
import { TaskService } from '../../../services/task.service';
import TaskItem from '../task-item/Taskitem';
import AddOrEditTask from '../add-task/AddOrEditTask';
import "./TaskList.css";

const TaskList = () => {
    const taskService = TaskService.instance;
    const [tasks, setTasks] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = async () => {
        const tasks = await taskService.getAllTasks();
        setTasks(tasks);
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
