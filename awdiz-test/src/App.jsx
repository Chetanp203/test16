
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Common/Register'
import Login from './Components/Common/Login'
import Navbar from './Components/Common/Navbar'
function App() {


  return (
    <>
    <Navbar/>
     <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/' element={<Home/>}/>
     </Routes>
    </>
  )
}

export default App
