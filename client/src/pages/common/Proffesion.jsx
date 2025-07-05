import React, { Profiler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Profile from '../../components/common/profile';
function Proffesion() {
const { professionName } = useParams(); 
const decodedName = decodeURIComponent(professionName); 
const [state, setState]=useState([])
const fetchProfessionals=async()=>{
    
}
useEffect(
    ()=>
{
   const dummyData = [
      {
        name: "Ravi Kumar",
        profession: decodedName,
        location: "Chennai",
        rating: 4.5
      },
      {
        name: "Anjali Sharma",
        profession: decodedName,
        location: "Bangalore",
        rating: 4.7
      }
    ];

    setState(dummyData);
}
    ,[decodedName]
)

  return (
    <div>
        <h1>{decodedName} ... here u go</h1>
      {state.map((data,ind)=>(
       <Profile key={ind} provider={data}/>
      ))}
    </div>
  )
}

export default Proffesion
