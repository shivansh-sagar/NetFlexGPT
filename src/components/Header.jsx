import React from 'react'
import Netflix_Logo from '../assets/Netflix_Logo.png';
const Header = () => {
  return (
    <div className=' absolute w-44 px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img  src={Netflix_Logo} alt="logo" />
    </div>
  )
}

export default Header