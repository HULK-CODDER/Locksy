import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='h-[9vh] w-full px-4 sm:w-[99vw] sm:px-0 flex justify-between sm:justify-around items-center bg-[hsl(219.38deg 33.33% 62.35%)]'>
        <img className='w-8 sm:w-[4vw] hover:scale-105 object-contain' src="../favicon.png" alt="logo" />

        <h1 className='text-3xl sm:text-4xl font-bold text-[#92c6f9]'>
          <span className='text-[#2f0bef]'>&lt;</span>
          <span>Lock</span>
          <span className='text-[#2f0bef]'>s</span>
          <span className='text-[#7e05ec]'>y</span>
          <span className='text-[#2f0bef]'>/</span>
          <span className='text-[#2f0bef]'>&gt;</span>
        </h1>

        <ul className='flex justify-around items-center gap-4 sm:gap-0.5 h-full'>
            <Link className='navbaratag' to="/">home</Link>
            <Link className='navbaratag' to="/contact">contact</Link>
            <Link className='navbaratag' to="/about">about</Link>
        </ul>
    </nav>
  )
}

export default Navbar
