import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../ApiConfig';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
    const {state,dispatch}=useContext(AuthContext);
    const router = useNavigate();
    const [userData,setUserData]= useState({email:"",password:""})

    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }

    const handleSubmit =async(event)=>{
        event.preventDefault();
        if(userData.email && userData.password){
            try {
                const response = await api.post('/login',{userData})
                if(response.data.success){
                    dispatch({
                        type:'login',
                        payload:response.data.user
                    })
                    localStorage.setItem("token",JSON.stringify(response.data.token))
                    setUserData({email:"",password:""})
                    router('/')
                    toast.success(response.data.message)
                }else{
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            toast.error("all fields are mandatory")
        }
    }
  return (
    <div style={{width:"100%"}}>
        <form onSubmit={handleSubmit} style={{width:"30%",margin:"auto",padding:"20px",border:"1px solid black",textAlign:"center"}}>
            <h1>Login</h1>
            
            <label>Email</label><br />
            <input type="email" name="email" onChange={handleChange} value={userData.email}/><br/>
            <label>Password</label><br />
            <input type="password" name="password" onChange={handleChange} value={userData.password}/><br/>
            <br />
            
            <input type="submit" value="Login" /><br/>

            <span>Dont have an account?<span onClick={()=>router('/register')}><b>Register</b></span></span>
        </form>

    </div>
  )
}

export default Login