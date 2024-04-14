

import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import {Table,Pagination} from 'react-bootstrap'

export default function App() {

const [data,setdata]=useState({
  data:[]
})

const [paginationitem,setPaginationitem] =useState([])

//function defenatioin


let gotopage=(e)=>{
   console.log(e.target.innerHTML)
   getData(e.target.innerHTML)
}

let first=(e)=>{
  if(data.meta.pagination.page!==1){
    getData(1)
  }
  

  }

let prev=(e)=>{
if(data.meta.pagination.page!==1){
  getData(data.meta.pagination.page -1)
}
}
let next=(e)=>{
  if(data.meta.pagination.page!==data.meta.pagination.pageCount){
    getData(data.meta.pagination.page +1)
  }
}
let last=(e)=>{
  console.log("last")
  if(data.meta.pagination.page!==data.meta.pagination.pageCount)
  getData(data.meta.pagination.pageCount)

}

   let getData=(pageno=1)=>{
    try {
      fetch(`http://localhost:1337/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
      .then((res)=>{return res.json()})
      .then((response)=>{
        
        setdata(response)
        
      
        var arr=[];
        var start =response.meta.pagination.page
      
        for(let i=1;i<=response.meta.pagination.pageCount;i++){
          if(i==start){
            arr.push(<Pagination.Item active onClick={(e)=>{gotopage(e)}}>{i}</Pagination.Item>)
          }else{
            arr.push(<Pagination.Item onClick={(e)=>{gotopage(e)}}>{i}</Pagination.Item>)
          }
          
        }
      
        setPaginationitem(arr)



      })
    } catch (error) {
      console.log(error)
    }

   }



  return (
    <>
    <div className='text-center'>
    <h1 className='text-center'>Read Operator</h1>
    <button className='btn btn-primary' onClick={()=>{getData()}}>get data</button>
    </div>
    <br/><br/>
    {
      data.data.length> 0 &&
  <>
 <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Action</th>
      </tr>
    </thead>
        <tbody>
      {
        data.data.map((currentvalue,index,arr)=>{
          console.log(arr[index].id)
          console.log(arr[index].attributes.name)
        return <tr key={index}>
                        <td>{arr[index].id}</td>
                        <td>{arr[index].attributes.name}</td>
                        <td>
                          <button className='btn btn-success'>view</button>
                          <button className='btn btn-info'>edit</button>
                          <button className='btn btn-danger'>delet</button>
                        </td>
                      </tr>   
        })
      }
        </tbody>
  </Table>

      <Pagination className='justify-content-center'>
        <Pagination.First onClick={(e)=>{first(e)}}/>
        <Pagination.Prev onClick={(e)=>{prev(e)}}/>


        {
          paginationitem.map((currentvalue,index,arr)=>{
            return currentvalue
          })
        }
    
        
        <Pagination.Next onClick={(e)=>{next(e)}} />
        <Pagination.Last onClick={(e)=>{last(e)}} />
      </Pagination>
    </>
    }
    </>
  )
  
}
