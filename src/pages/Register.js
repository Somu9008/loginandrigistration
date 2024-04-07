import React, { useState } from 'react'
import Swal from 'sweetalert2'
import '../App.css'
export default function () {

const [username,setusername]=useState();
const [email,setuseremail]=useState();
const [password,setuserpassword]=useState();


var data={
    username,email,password
}

function savedata(){

    console.log(username)
    console.log(email)
    console.log(password)
    fetch("http://localhost:1337/api/auth/local/register",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
        if(data.user){
            localStorage.setItem("userdata",JSON.stringify(data.user)+"jwt :"+JSON.stringify(data.jwt))
            Swal.fire({
                title: "data created successfully!",
                text: JSON.stringify(data.jwt),
                icon: "success"
              });
        }
        if(data.error){
            Swal.fire({
                title: "somthing went wrong!",
                text: JSON.stringify(data.error.message),
                icon: "error"
              });
        }
      console.log(data)
      
    })
}



  return (
    <>
     <div className='container'>
 <form>
      <h1>User registration Form</h1>
      <lable>Username</lable><br/>
        <input type="username" name="username" value={username} onChange={(e)=>{setusername(e.target.value)}}/><br/><br/>
      <lable>email</lable><br/>
        <input type="email" name="email" value={email} onChange={(e)=>{setuseremail(e.target.value)}}/><br/><br/>
        <lable>password</lable><br/>
        <input type="password" value={password}   onChange={(e)=>{setuserpassword(e.target.value)}}/><br/><br/>
        <input type="button" value="submit" onClick={()=>{savedata()}}/>
     </form>
  </div>
    
    </>
  )
}
