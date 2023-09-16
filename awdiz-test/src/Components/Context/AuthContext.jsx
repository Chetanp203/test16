import { createContext, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
import api from '../ApiConfig'

const initialState = {user:null}

export const AuthContext = createContext();

 const reducer =(state,action)=>{
    switch(action.type){
        case'login':
        return{...state,user:action.payload}
        case'logout':
        localStorage.removeItem("token")
        toast.success("Logout Success")
        return{...state,user:null}
        default:
            return state
    }
}

const AuthProvider =({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    useEffect(()=>{
        async function getCurrentUserData(){
            let token = JSON.parse(localStorage.getItem("token"))
            if(token){
                try {
                    const response = await api.post("/get-current-user",{token})
                    if(response.data.success){
                        dispatch({
                            type:"login",
                            payload:response.data.user
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getCurrentUserData();
    },[])
    return(
        <AuthContext.Provider value={{state,dispatch}}>
        {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;