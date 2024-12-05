'use client'
import useSWR from 'swr';
import  fetcher from './api/fetcher';
import Image from 'next/image';
import Link from 'next/link';
import { BsCheckCircleFill, BsDownload } from "react-icons/bs";


interface UnsplashPhoto {
    id: string;
    urls: {
        small: string;
        full: string;
    };
    alt_description: string | null;
    // [key: string]: any | undefined; // Optional: Include this if the object has additional unknown fields
}

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
    if (isLoading) return <p>Loading photos...</p>;

    if (error) return <p>Error loading photos: {error.message}</p>;

    return (
        <main id='gallery' className='border border-red-500 pt-[50px]'>
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

const Images = ({photos} : {photos}) => {
    return (
        <>
            {
                photos.map((photo) => {
                    console.log(photo.user)
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

                            <button type="button" className="download_photo">
                                <BsDownload />
                            </button>
                        </div>
                    )
                })
            }
        </>
    )
}