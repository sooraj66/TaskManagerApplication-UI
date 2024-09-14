import React, { useState } from 'react';
import './TaskItem.css'

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
        />
      ) : (
        <span>{task.title}</span>
      )}

      <p>status : {task.status}</p>

      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
