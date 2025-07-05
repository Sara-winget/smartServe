import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Home,Login,SignUp,Proffesion,UserDashboard } from './Routes';
function App() {


  return (
    <>
        <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profession/:professionName" element={<Proffesion />} />
        <Route path="/profile" element={<UserDashboard />} />
       

      </Routes>
    </Router>
    </>
  )
}

export default App
