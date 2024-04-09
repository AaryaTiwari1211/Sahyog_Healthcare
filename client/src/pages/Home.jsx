import React from 'react'
import { Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    const backBlur = {
        filter: "drop-shadow(0px 0px 40px #277CA5)"
    }

    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 3000); 
    }, []);
    const navigate = useNavigate()
    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center gap-6'>
            <div>
                <Typography color='white' style={backBlur} className='text-5xl font-bold uppercase font-inter'>Sahyog</Typography>
            </div>
            <div>
                <Typography color='white' style={backBlur} className='text-xl font-bold text-blue-500 font-inter'>"because you matter"</Typography>
            </div>
        </div>
    )
}

export default Home