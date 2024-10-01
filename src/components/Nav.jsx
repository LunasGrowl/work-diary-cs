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
    <div id= "nav--bar" className='sticky top-0 bg-zinc-200 dark:bg-synth-900 p-4 border-b-2 border-synth-500 dark:border-synth-500 ' >
      <div className='w-full flex flex-row justify-between items-center'>
        <p className='text-2xl m-0 font-medium font-sans'>Tata Log<span className='text-xs font-sans'>-Logo by William Lenthal</span></p>
        <div id = "right--navItems" className='flex align-middle'>
          <div id = "ld--toggle" className='flex justify-end '> 
            <input className="input" type="checkbox" name="darkmode" id="dark-mode"/>
            <label onClick={toggleTheme} htmlFor="dark-mode" className="label dark:bg-synth-700 bg-Synth-800">
              <span className="circle bg-slate-100 dark:bg-zinc-950"></span>
            </label>
          </div>
        <p className="p-1 m-0 text-sm text-synth-500">v2.0</p>
        </div>
      </div>
    </div>
  )
}

export default NavBar