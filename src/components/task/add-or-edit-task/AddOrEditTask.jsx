import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Config from '../../../Config';

function AddOrEditTask({ handleClose, task = null }) {
  const token = localStorage.getItem('access_token');

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [errorMessage, setErrorMessage] = useState(null);

  const createOrEditTask = async () => {
    if (!title.trim()) {
      setErrorMessage('Title should not be empty');
      return;
    }

    if (task) {
      // Edit task logic
      try {
        const url = `${Config.API_BASE_URL}/tasks/update/${task.id}`;
        const updateTask = { id: task.id, title, description };
        await axios.patch(url, updateTask, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        handleClose(true);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to update the task.');
      }
    } else {
      // Create new task logic
      try {
        const url = `${Config.API_BASE_URL}/tasks/create/`;
        await axios.post(url, { title, description }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        handleClose(true);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to create the task.');
      }
    }
  };

  return (
    <Modal show={true} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit' : 'Add'} Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && <p className='text-danger ms-3 mt-2'>{errorMessage}</p>}

        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task title"
            required
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Task description"
          />
        </div>
        <button type="button" className="register-btn mt-3" onClick={createOrEditTask}>
          Save
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default AddOrEditTask;
