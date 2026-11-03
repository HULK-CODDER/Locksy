import React from 'react'

const Footer = () => {
  return (
    <footer className='footer_style flex items-center justify-center gap-2.5 sm:gap-4 px-4 w-full'>
        <img className='w-8 sm:w-10 md:w-12 object-contain' src="../favicon.png" alt="logo" />
        <h2 className='text-base sm:text-xl md:text-3xl text-white text-center font-medium'>
          Created with ❤️ by <span className="text-[#92c6f9] font-bold">Daman</span>
        </h2>
    </footer>
  )
}

export default Footer
