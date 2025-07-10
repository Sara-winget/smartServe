import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Proffesiondetail from './page/proffesion detail'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Proffesiondetail/>
    </>
  )
}

export default App
