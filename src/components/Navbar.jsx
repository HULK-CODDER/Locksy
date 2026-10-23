import React from 'react'

const Navbar = () => {
  return (
    <nav className=' h-[9vh] w-[99vw] flex justify-around items-center bg-[hsl(219.38deg 33.33% 62.35%)]'>
        <img className='w-[4vw] hover:scale-105' src="../favicon.png" alt="logo" />

        <h1 className='text-4xl font-bold text-[#92c6f9] '>
          <span className='text-[#2f0bef]'>&lt;</span>
          <span >Lock</span>
          <span className='text-[#2f0bef]'>s</span>
          <span className='text-[#7e05ec]'>y</span>
          <span className='text-[#2f0bef]'>/</span>
           <span className='text-[#2f0bef]'>&gt;</span>
        </h1>

        <ul className='flex justify-around items-center w-[18vw] h-full gap-2.5'>
            <a className='navbaratag' href="/">home</a>
            <a className='navbaratag' href="/">contact</a>
            <a className='navbaratag' href="/">about</a>
        </ul>
    </nav>
  )
}

export default Navbar
