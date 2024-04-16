import React from 'react'
import { Spinner, Typography } from '@material-tailwind/react'

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
            <Spinner color="blue" className='w-12 h-12' />
            <Typography color="white" className="text-xl ">
                Uploading...
            </Typography>
        </div>
    )
}

export default Loader