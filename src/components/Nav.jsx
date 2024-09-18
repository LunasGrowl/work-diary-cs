import React from 'react'
import "./Nav.css";

// Gets the theme that has been previously loaded into local storage
// If no theme stored (first time launching) will apply 'dark' theme
const theme = localStorage.getItem('theme');
if(theme == null){
  localStorage.setItem('theme', 'dark');
} 
if(theme == "light"){ // Checks if 'light' theme is stored and removes dark as it's default
  document.documentElement.classList.remove('dark')
}

const NavBar = () => {

  // Add or remove 'dark' theme
  // Set current theme in local storage
  function toggleTheme(){
    document.documentElement.classList.toggle("dark")
    if(localStorage.getItem('theme') == 'dark'){localStorage.setItem('theme', 'light')}
    else{localStorage.setItem('theme', 'dark'); }
  }

  // HTML for nav component
  return (
    <div id= "nav--bar" className='sticky top-0 bg-zinc-200 dark:bg-zinc-900 p-4 border-b-4 border-cyan-500 dark:border-cyan-300 ' >
      <div className='w-full flex flex-row justify-between items-center'>
      <p></p>
        <p className='text-2xl m-0 font-medium'>Tata Log<span className='text-xs'>-Logo by William Len</span></p>
        <div id = "ld--toggle" className='flex justify-end'> 
          <input className="input" type="checkbox" name="darkmode" id="dark-mode"/>
          <label onClick={toggleTheme} htmlFor="dark-mode" className="label dark:bg-cyan-500 bg-cyan-700">
            <span className="circle bg-slate-100 dark:bg-zinc-950"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NavBar