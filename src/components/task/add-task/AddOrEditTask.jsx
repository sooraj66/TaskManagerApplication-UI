import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { TaskService } from '../../../services/task.service';

function AddOrEditTask({ handleClose, task = null }) {
  const taskService = TaskService.instance;
  const [title, setTitle] = useState(task?.title)
  const [description, setDescription] = useState(task?.description)

  const createOrEditTask = async () => {
    if (task) {
      // edit
      try {
        const updateTask = await taskService.updateTask({ id: task.id, title, description })
        handleClose(true);
      }
      catch (error) {
        console.log(error);
        handleClose();
      }
    } else {
      try {
        const tasks = await taskService.createTask({ title, description });
        handleClose(true);
      }
      catch (error) {
        console.log(error);
        handleClose();
      }
    }
  }

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{task != null ? 'Edit' : 'Add'} Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
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

              <label htmlFor="decription">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Task description"
                required
              />
            </div>
            <button type="button" className="register-btn" onClick={createOrEditTask}>Save</button>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddOrEditTask;