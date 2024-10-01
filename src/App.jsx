import NavBar from './components/Nav.jsx'
import DiaryEntry from './components/DiaryEntry.jsx'
import DiaryInput from './components/DiaryInput.jsx'
import { useState } from 'react'
import LeftBar from './components/LeftBar.jsx'


const App = () => {
  // Creates state to monitor any changes that may have been made to the database
  const [change,setChange] = useState('0')

  // HTML for the layout of the webpage
  return (
  <div id='app--container'>
    <NavBar />
    <div className='lg:pl-[19.5rem]'>
    <LeftBar/>
    <main id = "element--container" className='max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none '>
      <DiaryInput setChange = {setChange}/>
      <DiaryEntry change = {change} setChange = {setChange}/>
    </main>
    </div>
  </div>
  )
}

export default App
// flex flex-col max-w-7xl mx-auto