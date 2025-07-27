import React from 'react'
import Link from 'next/link'
const Header = () => {
  return (
    <nav className='flex justify-between px-10 py-2 bg-gradient-to-r from-blue-200 to-blue-700 items-center'>
        <div className='text-white text-3xl font-bold bg-clip-text'>
            <span className='bg-gradient-to-r'>AuthNext</span>
        </div>
        <div>
            <ul className='flex gap-4 text-black text-xl font-semibold font-sans'>
                <Link href={'/'}>
                    Home
                </Link>
                <Link href={'/about'}>
                    About
                </Link>
                <Link href={'/signin'}>
                    Signin
                </Link>
            </ul>
        </div>
    </nav>
  )
}

export default Header