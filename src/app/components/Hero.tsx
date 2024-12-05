'use client'

import {useEffect, useState } from 'react'
import landscape1 from "../../../public/assets/landscape1.jpg";
import landscape2 from "../../../public/assets/landscape2.jpg";
import landscape3 from "../../../public/assets/landscape3.jpg";
import landscape4 from "../../../public/assets/landscape4.jpg";
import landscape5 from "../../../public/assets/landscape5.jpg";
import landscape6 from "../../../public/assets/landscape6.jpg";
import landscape7 from "../../../public/assets/landscape7.jpg";
import landscape8 from "../../../public/assets/landscape8.jpg";
import SearchInput from './SearchInput';
// import useSWR from 'swr';
// import fetcher from '../api/fetcher';

const Hero = () => {
    const [randomImage, setRandomImage] = useState("");
  

    useEffect(() => {
        // Generate a random image only on the client-side
        const heroImages = [landscape1, landscape2, landscape3, landscape4, landscape5, landscape6, landscape7, landscape8];
        const selectedImage = heroImages[Math.floor(Math.random() * heroImages.length)];
        setRandomImage(selectedImage.src); // Update the state with the random image
    }, []); // This effect runs only once after the component mounts

    if (!randomImage) {
        // Ensure the component doesn't render until the randomImage is set
        return null; 
    }

    return (
        <section
            style={{
                backgroundImage: `linear-gradient(
                                            150deg,
                                            rgba(0, 0, 0, 0.9) 0%,
                                            rgba(0, 0, 0, 0.5) 65%,
                                            rgba(0, 0, 0, 0.2553221117548582) 100%
                                        ), url(${randomImage})`,  // Set background image if photo is loaded
                backgroundSize: 'cover',  // Ensures the image covers the section
                backgroundPosition: 'center',  // Centers the image
                height: '75vh',  // Makes the section take up the full viewport height
                width: '100%',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div >
                <h1 className='text-white text-4xl font-bold'>FREE SOURCES OF IMAGES</h1>
                <h2 className='text-white text-lg'>Browse and download images for free.</h2>
                <SearchInput/>
            </div>
        </section>
    )
}

export default Hero