import React, { useState } from 'react'
import Swal from 'sweetalert2'
import '../App.css'

export default function Login() {

    const [identifier,setemail]=useState()
    const [password,setpassword]=useState()


    var data={
        "identifier" :identifier,
        "password"   :password
    }


  function save(){
    
    fetch("http://localhost:1337/api/auth/local",{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(data)
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
       if(data.user){
        Swal.fire({
            title: "Good job!",
            text: JSON.stringify(data.jwt),
            icon: "success"
          });
       }
       if(data.error){
        Swal.fire({
            title: "Opps! invalid username or password",
            text: data.error.message,
            icon: "error"
          });
       }
    })

  }



  return (
  <div className='container'>
 <form>
      <h1>login page</h1>
      <lable>email</lable><br/>
        <input type="email" name="email" value={identifier} onChange={(e)=>{setemail(e.target.value)}}/><br/><br/>
        <lable>password</lable><br/>
        <input type="password" value={password} name="password"  onChange={(e)=>{setpassword(e.target.value)}}/><br/><br/>
        <input type="button" value="submit" onClick={()=>{save()}}/>
     </form>
  </div>
    
    
  )
}
