import React from 'react';
import './TaskDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const TaskDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState({});

    useEffect(() => {
        fetchtask();
    }, [])

    const fetchtask = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const url = `http://localhost:8000/tasks/${id}`;
            const result = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTask(result?.data)

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
            <Navbar />
            <div className="task-details-container">
                <div className="task-details-box">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <h2 className="task-header">Task Details</h2>
                    <div className="task-field">
                        <label className="task-label">Title:</label>
                        <span className="task-value">{task.title}</span>
                    </div>
                    <div className="task-field">
                        <label className="task-label">Description:</label>
                        <p className="task-value task-description">{task.description}</p>
                    </div>
                    <div className="task-field">
                        <label className="task-label">Status:</label>
                        <span className={`task-status ${task.status ? 'bg-success' : 'bg-warning'}`}>
                            {task.status ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskDetails;
