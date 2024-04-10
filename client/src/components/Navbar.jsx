import React, { useEffect, useState } from 'react';
import icon from '../assets/user-icon.png'
import { Typography } from '@material-tailwind/react';
import { CiBellOn } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { MdLogout } from "react-icons/md";
import { SignOutButton } from '@clerk/clerk-react';

const Navbar = () => {

    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const user = useUser();
    const clickHandler = () => {
        setClicked(!clicked);
        console.log('clicked')
    }


    return (
        <div className='fixed top-0 z-50 flex items-center justify-between w-screen p-4 backdrop-blur-lg'>
            <div className='flex items-center gap-2'>
                <div className='pfp '>
                    <img src={user.user?.imageUrl} alt="" className='w-[46px] h-[46px] rounded-full' />
                </div>
                <div className='flex flex-col ml-1 text '>
                    <Typography color='white' className='font-semibold' variant='h6'>
                        Welcome {user.user?.firstName}
                    </Typography>
                </div>
            </div>
            <div className='flex'>
                <SignOutButton signOutCallback={() => navigate('/login')}>
                    <MdLogout color='white' className='w-[28px] h-[28px]' />
                </SignOutButton>

            </div>
        </div>
    )
}

export default Navbar