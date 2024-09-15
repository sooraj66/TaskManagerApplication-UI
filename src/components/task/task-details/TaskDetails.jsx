import React from 'react';
import './TaskDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../navbar/Navbar';
import Config from '../../../Config';

const TaskDetails = () => {
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState({});

    useEffect(() => {
        fetchtask();
    }, [])

    const fetchtask = async () => {
        try {
            const url = `${Config.API_BASE_URL}/tasks/${id}`;
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

    const formatDate = (timestampString) => {
        const date = new Date(timestampString);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

        return formattedDate
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
                    <div className="task-field row">
                        <label className="task-label">Created At:</label>
                        <p className="task-value task-description">{formatDate(task.created_at)}</p>
                    </div>
                    <div className="task-field">
                        <label className="task-label">Updated At:</label>
                        <p className="task-value task-description">{formatDate(task.updated_at)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskDetails;
