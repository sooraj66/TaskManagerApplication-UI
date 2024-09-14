import React, { useEffect, useState } from 'react';
import TaskItem from './Taskitem';
import Navbar from './Navbar';
import "./TaskManger.css";
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TaskManager = () => {
  console.log("#####")

  const { id } = useParams();
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);


  const alltasks = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/alltasks/');
        console.log(response)
        setTasks(response.data);
    } catch (error) {
        if (error.response) {
            console.error(`Error Status Code: ${error.response.status}`);
            console.error(error.response.data);
        } else {
            console.error('There was a problem with the axios request:', error.message);
        }
    }
};

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, status: 'pending' };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTitle) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, title: updatedTitle } : task
    );
    setTasks(updatedTasks);
  };



  const deleteTask = async () => {
    try{
      await axios.delete(`http://127.0.0.1:8000/tasks/delete/${id}`)
      navigate('/');
    }
    catch (error) {
      if (error.response) {
          setError(`Error Status Code: ${error.response.status} - ${error.response.data}`);
      } else {
          setError(`There was a problem with the axios request: ${error.message}`);
      }
  }
  };

  const filterTasks = (status) => {
    if (status === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === status));
    }
  };

  const searchTasks = (query) => {
    setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())));
  };

  useEffect(() => {
    alltasks();
  },[])

  return (
    <div className="task-manager">
      <Navbar onSearch={searchTasks} onFilter={filterTasks} />
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdate={updateTask} 
            onDelete={deleteTask} 
          />
        ))}
      </div>
      <button onClick={() => addTask('New Task')}>Add Task</button>
    </div>
  );
};

export default TaskManager;
