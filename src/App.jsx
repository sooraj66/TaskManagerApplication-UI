/**
 * Main entry point of the React application.
 * 
 * This component serves as the root component of the React application.
 * It imports necessary components such as UserRegistration, UserLogin, TaskManger.
 * It sets up routing using React Router to navigate between different pages.
 * 
 * The JSX element representing the root component of the application.
 */


import { useEffect, useState } from 'react'
import UserRegistration from './components/auth/registration/Registration'
import UserLogin from './components/auth/login/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css"
import TaskContainer from './components/task/task-container/TaskContainer';
import TaskDetails from './components/task/task-details/TaskDetails';




function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (!token) {
  //     navigate('/login')
  //   }
  // })

  return (
    <>
      <Routes>
        <Route path="/signup" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<TaskContainer />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />

      </Routes>
    </>
  )
}

export default App; {/* To export the functional component App to Main */ }
