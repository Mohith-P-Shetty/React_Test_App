import React from 'react'
import 'react-router-dom'
import BasePage from './pages/BasePage'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
function App() {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasePage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App