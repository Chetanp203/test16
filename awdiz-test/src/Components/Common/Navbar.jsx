import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const router = useNavigate();
  return (
    <div style={{width:"100%",height:"60px",display:"flex",justifyContent:"space-around",backgroundColor:"skyblue",alignItems:"center"}}>
        <h1><em>Awdiz</em></h1>
       <h4>Add Question</h4>
       <h4 onClick={()=>router('/login')}>Login/Register</h4>
       <h4>Logout</h4>
    </div>
  )
}

export default Navbar