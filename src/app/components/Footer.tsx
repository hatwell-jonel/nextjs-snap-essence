import Link from 'next/link'
import React from 'react'
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='mt-28 py-5 bg-slate-100'>
        <div className='content_center'>
            <p className='text-center text-sm text-slate-500'>
                © 2024 Jonel Hatwell. Reach out at 
                <Link className='ms-1 gap-1 text-[#0091ff] inline-flex justify-center items-center' href="https://www.linkedin.com/in/jonel-hatwell/"><FaLinkedin /> LinkedIn</Link>.
            </p>
        </div>
    </footer>
  )
}

export default Footer