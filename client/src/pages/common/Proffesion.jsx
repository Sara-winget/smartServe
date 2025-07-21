import React, { Profiler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Profile from '../../components/common/profile';
import api from '../../api/axios';
function Proffesion() {
const { professionName } = useParams(); 
const decodedName = decodeURIComponent(professionName); 
const [state, setState]=useState([])
const fetchProfessionals=async()=>{
    
}
useEffect(
    ()=>
{
  const fetch = async()=>{try{
    const {data}=await api.get(`/proffesion/getProviders/${decodedName}`)
    console.log(data)
    setState(data)
}
catch(e){
  console.log(e)
}
}

fetch()
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
