import React, { useEffect, useState } from 'react';
import { TaskService } from '../../../services/task.service';
import Navbar from '../../navbar/Navbar';
import TaskItem from '../task-item/Taskitem';
import "./TaskList.css";

const TaskList = () => {
    const taskService = TaskService.instance;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = async () => {
        const tasks = await taskService.getAllTasks();
        setTasks(tasks);
    }

    return <div className="task-list-container">
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                // onUpdate={updateTask}
                // onDelete={deleteTask}
                />
            ))}
        </div>
    </div>
};

export default TaskList;
