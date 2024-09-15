import React, { useState } from 'react';
import './TaskItem.css'
import AddOrEditTask from '../add-or-edit-task/AddOrEditTask';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ConfirmDelete from '../../confirm-delete/ConfirmDelete';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TaskItem = ({ task, refetch }) => {
  const token = localStorage.getItem('access_token');
  const apiBaseUrl = `http://localhost:8000`;

  const navigate = useNavigate();

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
      const url = `${apiBaseUrl}/tasks/delete/${task.id}`;
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

  const markCompleted = async (task) => {
    try {
      const url = `${apiBaseUrl}/tasks/update/${task.id}`;
      const status = { status: true }
      const result = await axios.patch(url, status, {
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
      {showEditPopup && <AddOrEditTask handleClose={handleHideAddTaskPopup} task={task} />}

      {showConfirmDelete && <ConfirmDelete handleClose={handleHideConfirmDelete} deleteTask={() => deleteTask(task)} />}

      <Card border="primary" className="task-item-card shadow-sm">
        <Card.Header>
          <Link to={`/tasks/${task.id}`} className="task-title-link">{task.title}</Link>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <span className={`badge ${task.status ? 'bg-success' : 'bg-warning'}`}>
              {task.status ? 'Completed' : 'Pending'}
            </span>
          </Card.Title>
          <Card.Text>{task.description}</Card.Text>
          <div className="task-actions d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={handleShowEditTaskPopup}>Edit</button>
            <button className="btn btn-outline-danger" onClick={handleShowConfirmDelete}>Delete</button>
            {task.status == false && <button className="btn btn-primary" onClick={() => markCompleted(task)}>Mark as Completed</button>
            }
          </div>
        </Card.Body>
      </Card>
    </>


  );
};

export default TaskItem;
