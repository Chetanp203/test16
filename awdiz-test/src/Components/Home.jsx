import React, { useContext, useEffect, useState } from 'react';
import api from './ApiConfig'
import { AuthContext } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [questions,setQuestions]=useState([]);
  const {state}=useContext(AuthContext);
  console.log(questions)

  const username = state?.user?.name;
  const router=useNavigate()
  useEffect(()=>{
    async function allQuestions(){
      try {
        const response = await api.get('/all-questions')
        if(response.data.success){
          setQuestions(response?.data?.questions)
        }
      } catch (error) {
        console.log(error);
      }
    }
    allQuestions();
  },[])

   useEffect(()=>{
      if(!username){
        router("/login")
      }
      },[username])
  return(
  
   <div style={{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
    {
      questions.length && questions.map((item)=>{
        return <div key={item._id} style={{width:"40%",border:"1px solid black",padding:"20px",margin:"20px"}}>
          <h3>Ques:-{item.question}</h3>
          <br />
          <h4>A:-{item.first}</h4>
          <h4>B:-{item.second}</h4>
          <h4>C:-{item.third}</h4>
          <h4>D:-{item.fourth}</h4>
        </div>
      })
    }
  
   </div>
  )
}
export default Home;