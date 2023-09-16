import React, { useEffect, useState } from 'react';
import api from './ApiConfig'

const Home = () => {
  const [questions,setQuestions]=useState([]);
  console.log(questions)
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
  return(
   <>
    {
      questions.length && questions.map((item)=>{
        return <div key={item._id}>
          <h3>Ques:-{item.question}</h3>
          <br />
          <h4>A:-{item.first}</h4>
          <h4>B:-{item.second}</h4>
          <h4>C:-{item.third}</h4>
          <h4>D:-{item.fourth}</h4>
        </div>
      })
    }
   </>
  )
}
export default Home;