import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'

function App() {

  return (
   <>
   <header className='h-[10vh] w-screen flex justify-center items-center bg-blue-950'>
    <Navbar/>
   </header>
   <main className='h-[80vh] w-screen  bg-[radial-gradient(circle,#f3f4f6,#f3f4f6,#2f0bef)]'>
    <Manager/>
   </main>
   <footer className='h-[10vh] w-screen flex justify-center items-center bg-blue-950'>
    <Footer/>
   </footer>
   </>
  )  
}

export default App
