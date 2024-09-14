/**
 * Main entry point of the React application.
 * 
 * This component serves as the root component of the React application.
 * It imports necessary components such as UserRegistration, UserLogin, TaskManger.
 * It sets up routing using React Router to navigate between different pages.
 * 
 * The JSX element representing the root component of the application.
 */


import { useState } from 'react'
import UserRegistration from './components/auth/registration/Registration'
import UserLogin from './components/auth/login/Login';
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import TaskContainer from './components/task/task-container/TaskContainer';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<TaskContainer />} />  {/* Define routes for different pages */}
        <Route path="/signup" element={<UserRegistration />} />  {/* Route for the registration page */}
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </>
  )
}

export default App; {/* To export the functional component App to Main */ }
