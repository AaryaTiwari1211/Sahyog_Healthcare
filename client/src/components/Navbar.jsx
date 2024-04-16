import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { MdLogout } from "react-icons/md";
import { SignOutButton } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useUser();

    return (
        <div className='fixed top-0 z-50 flex items-center justify-between w-screen p-4 backdrop-blur-lg'>
            <div className='flex items-center gap-2'>
                <UserButton appearance={{
                    baseTheme: 'dark',
                }} />
                <div className='flex flex-col ml-1 text '>
                    <Typography color='white' className='font-semibold' variant='h6'>
                        Welcome {user.user?.firstName}
                    </Typography>
                </div>
            </div>
            <div className='flex'>
                <SignedIn>
                    <SignOutButton signOutCallback={() => navigate('/login')}>
                        <MdLogout color='white' className='w-[28px] h-[28px]' />
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <Link to='/login'>
                        <Typography color='white' className='font-semibold' variant='h6'>
                            Sign In
                        </Typography>
                    </Link>
                </SignedOut>
            </div>
        </div>
    )
}

export default Navbar