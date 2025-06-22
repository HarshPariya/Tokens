import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate= useNavigate()

    const handleClick=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

  return (
    <>
    <div><h1>WelCome To Home Page</h1></div>
    <button onClick={handleClick}>Logout</button>
    </>
  )
}

export default Home