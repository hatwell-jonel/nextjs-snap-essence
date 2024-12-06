import React from 'react'
import { LoaderCircle } from "lucide-react";

const Loading = ({ className = '' }) => {
    return (
        <p className={`${className}`}> 
            <LoaderCircle className='animate-spin' /> Loading...
        </p>
    )
}

export default Loading