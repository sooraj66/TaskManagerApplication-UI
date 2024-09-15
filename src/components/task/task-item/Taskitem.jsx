import React, { useState } from 'react';
import './TaskItem.css'
import AddOrEditTask from '../add-task/AddOrEditTask';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ConfirmDelete from '../../ConfirmDelete/ConfirmDelete';


const TaskItem = ({ task, refetch }) => {

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleShowEditTaskPopup = () => {
    setShowEditPopup(true)
  }

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true)
  }

  const handleHideConfirmDelete = () => {
    setShowConfirmDelete(false)
  }

  const handleHideAddTaskPopup = (isEditSuccess = false) => {
    setShowEditPopup(false);
    if (isEditSuccess)
      refetch();
  }

  const deleteTask = async (task) => {
    try {
      const token = localStorage.getItem('access_token');
      const url = `http://localhost:8000/tasks/delete/${task.id}`;
      console.log(task.id)
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      refetch();
    }
    catch (err) {
      if (err?.status === 401) {
        navigate('/login')
      }
      console.log(err)
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

      {showConfirmDelete && <ConfirmDelete handleClose={handleHideConfirmDelete} deleteTask={() => deleteTask(task)} />}

      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>{task.title}</Card.Header>
        <Card.Body>
          <Card.Title><span>status : {task.status ? 'completed' : 'pending'}</span></Card.Title>
          <Card.Text>
            {task.description}
          </Card.Text>
          <div className="task-actions">
            <button onClick={handleShowEditTaskPopup}>Edit</button>
            <button onClick={handleShowConfirmDelete}>Delete</button>
          </div>
        </Card.Body>
      </Card>
    </>


  );
};

export default TaskItem;
