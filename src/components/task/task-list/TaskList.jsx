import React, { useEffect, useState } from 'react';
import TaskItem from '../task-item/Taskitem';
import "./TaskList.css";

const TaskList = ({ tasks, refetch }) => {

    return (
        <div className="row  row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  task-list">
            {tasks.length === 0 ? (
                <div>No Tasks</div>
            ) : (
                tasks.map(task => (
                    <div className="col" key={task.id}>
                        <TaskItem
                            task={task}
                            refetch={refetch}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
