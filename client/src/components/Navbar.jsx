import React, { useEffect, useState } from 'react';
import icon from '../assets/user-icon.png'
import { Typography } from '@material-tailwind/react';
import { CiBellOn } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [clicked, setClicked] = useState(false);
    const clickHandler = () => {
        setClicked(!clicked);
        console.log('clicked')
    }

    // if (!isLoggedIn) {
    //     navigate('/');
    // }

    // useEffect(() => {
    //     // setUserIcon(user.picture);
    //     console.log(user.picture);
    // }, [user]);

    return (
        <div className='fixed top-0 z-50 flex justify-between w-screen backdrop-blur-lg '>
            <div className='flex mt-6 mb-3 ml-4 left '>
                <div className='pfp '>
                    <img alt="" className='w-[46px] h-[46px] rounded-full' />
                </div>
                <div className='flex flex-col ml-1 text '>
                    <Typography color='white' className='font-semibold' variant='h6'>
                        Welcome
                    </Typography>
                    <Typography color='white' variant='small' className='font-'>
                        Mumbai, India
                    </Typography>

                </div>
            </div>
            <div className='flex gap-3 mt-8 mr-8 right'>
                <CiBellOn onClick={clickHandler} color='white' className='w-[28px] h-[28px]' />
                <CiMenuBurger color='white' className='w-[28px] h-[28px]' />
            </div>

        </div>
    )
}

export default Navbar