import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from './../Context/AuthContext'
import { toast } from 'react-hot-toast';

const Register = () => {
    const router = useNavigate();
    const [userData,setUserData]= useState({name:"",email:"",password:"",role:"Buyer"})
    const {state,dispatch}=useContext(AuthContext)

    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }

    const handleSelectChange = (event)=>{
        setUserData({...userData,"role":event.target.value})
    }

    const handleSubmit =async(event)=>{
     event.preventDefault();
     if(userData.name && userData.email && userData.password && userData.role){
        try {
            const response = await api.post("/register",{userData})
            if(response.data.success){
                setUserData({name:"",email:"",password:"",role:"Buyer"})
                router('/login')
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
     }else{
        toast.error("All fields are mandatory")
     }
    }

    
  return (
    <div style={{width:"100%"}}>
        <form onSubmit={handleSubmit} style={{width:"30%",margin:"auto",padding:"20px",border:"1px solid black",textAlign:"center"}}>
            <h1>Register</h1>
            <label>Name</label><br />
            <input type="text" name="name" onChange={handleChange} value={userData.name}/><br/>
            <label>Email</label><br />
            <input type="email" name="email" onChange={handleChange} value={userData.email}/><br/>
            <label>Password</label><br />
            <input type="password" name="password" onChange={handleChange} value={userData.password}/><br/>
            <br />
            <select onChange={handleSelectChange}>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Admin">Admin</option>
            </select><br /><br />
            <input type="submit" value="Register" /><br/>

            <span>Already have an account?<span onClick={()=>router('/login')}><b>Login</b></span></span>
        </form>

    </div>
  )
}

export default Register