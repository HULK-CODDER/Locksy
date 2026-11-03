import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='h-[9vh] w-full px-4 sm:px-8 flex justify-between sm:justify-around items-center bg-[hsl(219.38deg,33.33%,62.35%)] shadow-md'>
        {/* Logo */}
        <img className='w-8 sm:w-10 md:w-[4vw] hover:scale-105 transition-transform object-contain' src="../favicon.png" alt="logo" />

        {/* Brand Title */}
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#92c6f9]'>
          <span className='text-[#2f0bef]'>&lt;</span>
          <span>Lock</span>
          <span className='text-[#2f0bef]'>s</span>
          <span className='text-[#7e05ec]'>y</span>
          <span className='text-[#2f0bef]'>/</span>
          <span className='text-[#2f0bef]'>&gt;</span>
        </h1>

        {/* Navigation Links */}
        <ul className='flex justify-around items-center gap-3 sm:gap-6 h-full text-sm sm:text-base'>
            <Link className='navbaratag font-medium hover:text-[#2f0bef] transition-colors' to="/">home</Link>
            <Link className='navbaratag font-medium hover:text-[#2f0bef] transition-colors' to="/contact">contact</Link>
            <Link className='navbaratag font-medium hover:text-[#2f0bef] transition-colors' to="/about">about</Link>
        </ul>
    </nav>
  )
}

export default Navbar
