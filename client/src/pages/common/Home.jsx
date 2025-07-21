import React, { useEffect, useState } from 'react'
import HomeCard from '../../components/common/HomeCard';
import { FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import api from '../../api/axios';
function Home() {
const [categoryData,setCategoryData] = useState([])
  useEffect(
()=>{
  const fetch = async()=>{
  const {data}=await api.get('/proffesion/getService')
  console.log(data)
  setCategoryData(data)
}
fetch()
},[]
  )
    const nav=useNavigate()
    
const [hasNotification, setHasNotification] = useState(false); 
  return (
    <div  >
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
  {/* Logo */}
  <h1 className="text-2xl font-bold text-purple-700">Smart Serve</h1>

  {/* Search Bar */}
  <div className="flex items-center bg-purple-50 rounded-md px-3 py-2 mx-4 w-100">
    <span className="text-gray-500 text-sm">Search</span>
  </div>
  <div className="relative mx-2">
  <FiBell className="text-xl text-gray-700 cursor-pointer" />
        {hasNotification && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        )}
</div>

  {/* Profile */}
  <h6 className="text-sm text-gray-700" onClick={()=>nav('/profile')}>Profile</h6>
</div>


<div>


 

  {categoryData.map((data ,ind)=> (
    <HomeCard  key={ind} category={data.category}  professions={data.professions}/>
  ))}


</div>

    </div>
  )
}

export default Home
