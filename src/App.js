import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';



export default function App() {
  return (

   <Router>
     <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='*' element={<h2>page not found</h2>}/>
     </Routes>
   </Router>
  
 

  




  )
}
