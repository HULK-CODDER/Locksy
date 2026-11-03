import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <header className='h-[10vh] w-screen flex justify-center items-center bg-blue-950'>
        <Navbar />
      </header>

      <main className='h-[80vh] w-screen bg-[radial-gradient(circle,#f3f4f6,#f3f4f6,#2f0bef)] overflow-y-auto'>
        <Routes>
          <Route path="/" element={<Manager />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className='h-[10vh] w-screen flex justify-center items-center bg-blue-950'>
        <Footer />
      </footer>
    </Router>
  )
}

export default App