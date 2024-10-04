import NavBar from './components/Nav.jsx'
import DiaryEntry from './components/DiaryEntry.jsx'
import DiaryInput from './components/DiaryInput.jsx'
import { useState } from 'react'
import LeftBar from './components/LeftBar.jsx'
import MainContent from './MainContent.jsx'


const App = () => {

  // HTML for the layout of the webpage
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 grid-rows-[70px_minmax(900px,_1fr)_100px] ">
        <div className="sticky top-0 col-span-6 flex">
          <NavBar/>
        </div>
        <div className=" top-0 row-span-4 md:col-span-2 col-span-1 lg:col-span-2 xl:col-span-1 hidden md:block row-start-2">
          <LeftBar/>
        </div>
        <div className="col-span-5 row-span-4 row-start-2 :col-span-4 ">
          <MainContent/>
        </div>
    </div>


  // <div id='app--container'>
  //   <NavBar />
  //   <div className='lg:pl-[19.5rem]'>
  //   <LeftBar/>
  //   <main id = "element--container" className='max-w-3xl mx-auto  z-20 pt-10 xl:max-w-none '>
  //     <DiaryInput setChange = {setChange}/>
  //     <DiaryEntry change = {change} setChange = {setChange}/>
  //   </main>
  //   </div>
  // </div>
  )
}

export default App