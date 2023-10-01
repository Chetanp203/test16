import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
    const router = useNavigate();
    const {state,dispatch}=useContext(AuthContext);
  return (
    <div style={{width:"100%",height:"60px",display:"flex",justifyContent:"space-around",backgroundColor:"skyblue",alignItems:"center"}}>
        <h1 onClick={()=>router('/')}><em>Awdiz</em></h1>
       <h4 onClick={()=>router('/a')}>Add Question</h4>
       {!state?.user && <h4 onClick={()=>router('/login')}>Login/Register</h4>}
       {state?.user && <h4 onClick={()=>dispatch({type:"logout"})}>Logout</h4>}
    </div>
  )
}

export default Navbar