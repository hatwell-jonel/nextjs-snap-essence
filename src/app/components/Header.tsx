'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "../../../public/assets/sp_logo.png";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed z-[999] top-0 left-[110px] p-3 transition-colors duration-500 ${
                isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className="content_center">
                <Image src={logo} width={150} height={250} alt="logo" />
            </div>
        </header>
    );
};

export default Header;
