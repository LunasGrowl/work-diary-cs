import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './components/Nav.jsx'
import DiaryEntry from './components/DiaryEntry.jsx'
import DiaryInput from './components/DiaryInput.jsx'
import { useState } from 'react'


const App = () => {

  const [change,setChange] = useState('0')

  return (
  <div id='app--container'>
    <NavBar />
    <div id = "element--container" className='flex flex-col max-w-7xl mx-auto bg-white dark:bg-black '>
      <DiaryInput setChange = {setChange}/>
      <DiaryEntry change = {change} setChange = {setChange}/>
    </div>
  </div>
  )
}

export default App