'use server';
import axios from 'axios';
import { UNPLASH_BASE_URL } from './constants';


const ACCESS_KEY  = process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY;

export const getRandomPhotos = async () => {
    const count = 2;
    try {
        const response = await axios.get(`${UNPLASH_BASE_URL}/photos?per_page=${count}`, {
            headers : {
                Authorization : `Client-ID ${ACCESS_KEY}`
            }
        })
        return response;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error; // Ensure errors are propagated correctly
    }

}
