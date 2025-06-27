import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import MngrHome from './Components/MngrHome'
import EmpHome from './Components/EmpHome'
import { Toaster } from 'sonner'

function App() {

  return (
    <div className='w-screen h-screen bg-zinc-800 text-white'>
      <Toaster position="top-center"/>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/manager' Component={MngrHome}/>
        <Route path='/employee' Component={EmpHome}/>
      </Routes>
    </div>
  )
}

export default App
