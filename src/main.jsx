import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './components/Nav.jsx'
import DiaryEntry from './components/DiaryEntry.jsx'
import DiaryInput from './components/DiaryInput.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
