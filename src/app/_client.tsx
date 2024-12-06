'use client'
import useSWR from 'swr';
import  fetcher from './api/fetcher';
import Image from 'next/image';
import Link from 'next/link';
import { BsCheckCircleFill, BsDownload } from "react-icons/bs";
import { downloadImage } from './helpers';
import Loading from './loading';
import { useEffect, useState } from 'react';
import { PhotoResponse } from './lib/types';

export const Gallery = ({...props}) => {

    function swrEnpoint(query : string) {
        const count = 30;
        if (query) {
            return `/search/photos?query=${query}&per_page=${count}`;
        } else {
            return `/photos?per_page=${count}`;
        }
    }
    const { data: photos, error, isLoading } = useSWR(swrEnpoint(props.query), fetcher);

    // Error and loading states
    if (isLoading) {
        return (
            <div className='content_center'>
                <Loading className="flex items-center justify-center gap-2 mt-10 fw-bold text-center text-4xl" />
            </div>
        )
    };

    if (error) return <p>Error loading photos: {error.message}</p>;

    return (
        <main id='gallery' className='pt-[50px]'>
            <div className="content_center">
                <h3>
                    {
                        <p className='text-2xl font-bold mb-[25px]'>
                            {
                                props.query.trim() == ""  ? <span>Browse photos:</span> : 
                                <span>Search results for {props.query}</span>
                            }
                        </p>
                    }
                </h3>
                <div className="masonry">
                    {
                        props.query.trim() == "" ? <Images photos={photos} /> : <Images photos={photos.results} /> 
                    }
                </div>
            </div>
        </main>
    )
}

const Images = ({photos} : {photos : PhotoResponse}) => {
    return (
        <>
            {
                photos.map((photo) => {
                    return (
                        <div className="photo"  key={photo.id}>
                            <div className="owner">
                                <Link 
                                    href={photo.user?.portfolio_url ?? ""} 
                                    className='owner_link' 
                                    target="_blank"
                                >
                                    <Image
                                        src={photo.user?.profile_image?.medium}
                                        className='owner_img'
                                        width={10}
                                        height={10}
                                        alt={photo.user?.username}
                                    />

                                    <div className="owner_info">
                                        <p className="owner_username">{photo.user?.username}</p>
                                        {
                                            photo.user.for_hire ? (
                                                <p className="owner_hire">
                                                    Available for hire <BsCheckCircleFill />
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </Link>
                            </div>

                            <Image
                                src={photo.urls?.regular || photo.urls?.full || photo.urls?.raw}
                                width={photo.width}
                                height={photo.height}
                                alt={photo.alt_description}
                            />

                            <button 
                                type="button" 
                                className="download_photo"
                                onClick={() => downloadImage(photo.urls?.raw)}
                            >
                                <BsDownload />
                            </button>
                        </div>
                    )
                })
            }
        </>
    )
}


export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // This ensures that the code below runs only in the browser
    useEffect(() => {
        const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };

        // Listen to the scroll event and toggle visibility
        window.addEventListener("scroll", toggleVisibility);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []); // Empty dependency array ensures this effect runs once after mount

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    
    if (!isVisible) return null; // Hide the button when not visible

    return (
        isVisible && (
        <button
            onClick={scrollToTop}
            style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "18px",
            }}
            aria-label="Back to top"
        >
            ↑
        </button>
        )
    );
};
