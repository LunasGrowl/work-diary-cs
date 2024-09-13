import React from 'react'
import "./Nav.css";



const NavBar = () => {

  const theme = localStorage.getItem('theme');
  if(theme == null){
    localStorage.setItem('theme', 'dark');
  } 
  if(theme == "light"){
    document.documentElement.classList.remove('dark')
  }

 
function toggleTheme(){
  document.documentElement.classList.toggle("dark")
  if(localStorage.getItem('theme') == 'dark'){localStorage.setItem('theme', 'light')}
  else{
    localStorage.setItem('theme', 'dark');
  }

  
}

  return (
    <div id= "nav--bar" className='sticky top-0 bg-zinc-200 dark:bg-zinc-900 p-4 border-b-4 border-cyan-500 dark:border-cyan-300 ' >
      <div className='w-full flex flex-row justify-between items-center'>
      <p></p>
        <p className='text-2xl m-0 font-medium'>Tata Log<span className='text-xs'>-Logo by William Len</span></p>
        <div id = "ld--toggle" className='flex justify-end'> 
          <input class="input" type="checkbox" name="darkmode" id="dark-mode"/>
          <label onClick={toggleTheme} for="dark-mode" class="label dark:bg-cyan-500 bg-cyan-700">
            <span class="circle bg-slate-100 dark:bg-zinc-950"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NavBar