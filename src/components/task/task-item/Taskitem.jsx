import React, { useState } from 'react';
import './TaskItem.css'
import AddOrEditTask from '../add-task/AddOrEditTask';
import { TaskService } from '../../../services/task.service';
import Card from 'react-bootstrap/Card';


const TaskItem = ({ task, refetch }) => {
  const taskService = TaskService.instance;

  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleShowEditTaskPopup = () => {
    setShowEditPopup(true)
  }

  const handleHideAddTaskPopup = (isEditSuccess = false) => {
    setShowEditPopup(false);
    if (isEditSuccess)
      refetch();
  }

  const deleteTask = async (task) => {
    try {
      await taskService.deleteTask(task.id)
      refetch();
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      {/* <div className="task-item">
        <span>{task.title}</span>

        <span>status : {task.status ? 'completed' : 'pending'}</span>

        <div className="task-actions">
          <button onClick={handleShowEditTaskPopup}>Edit</button>
          <button onClick={() => deleteTask(task)}>Delete</button>
        </div>
      </div> */}
      {showEditPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} task={task} />}

      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>{task.title}</Card.Header>
        <Card.Body>
          <Card.Title><span>status : {task.status ? 'completed' : 'pending'}</span></Card.Title>
          <Card.Text>
            {task.description}
          </Card.Text>
          <div className="task-actions">
            <button onClick={handleShowEditTaskPopup}>Edit</button>
            <button onClick={() => deleteTask(task)}>Delete</button>
          </div>
        </Card.Body>
      </Card>
    </>


  );
};

export default TaskItem;
