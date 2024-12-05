// api/axiosInstance.js
import axios from 'axios';
import { UNPLASH_BASE_URL } from "@/app/constants";

const ACCESS_KEY  = process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY;

const axiosInstance = axios.create({
    baseURL: UNPLASH_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization : `Client-ID ${ACCESS_KEY}`
    },
});

const fetcher = (url : string) => axiosInstance.get(url).then((response) => response.data).catch((err) => console.error(err));

export default fetcher;
