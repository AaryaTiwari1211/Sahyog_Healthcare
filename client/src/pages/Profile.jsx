import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, IconButton, Typography, Spinner } from '@material-tailwind/react';
import { FaUpload } from 'react-icons/fa';
import { Input, Select, Label, Option } from '@material-tailwind/react';
import Appbar from '../components/appbar/Appbar';
import { useContext } from 'react';
import { MdDocumentScanner } from "react-icons/md";
import SahyogCard from '../components/Sahyogcard/SahyogCard';
import { useUser } from '@clerk/clerk-react';
import { db } from '../components/FirebaseSDK';
import { collection, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const ProfileData = ({ label, content, onChange }) => {

    return (
        <div className='flex flex-col gap-2 '>
            <Typography color='white' className='text-lg font-bold text-blue-500 font-inter'>
                {label}
            </Typography>
            (
            <Input
                type='text'
                value={content}
                className='text-white outline-none'
                onChange={(e) => onChange(label.toLowerCase(), e.target.value)}
            />
            )
        </div>
    );
};

const Profile = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
    }, []);

    const initialProfileData = {
        name: user?.fullName,
        email: user?.emailAddresses[0].emailAddress,
        age: '',
        emergencyContact: '',
    };

    const [error, setError] = useState(null);

    const [profileData, setProfileData] = useState(initialProfileData);

    const handleChange = (field, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        if (!profileData.age) {
            setError('Please fill all the fields');
            return;
        }
        else {
            console.log(profileData);
            const docRef = collection(db, 'users', user.id);
            console.log(docRef);
            setDoc(docRef, profileData, { merge: true });
            navigate('/landing');
        }
    }

    return (
        <>
            <div className='flex flex-col gap-10 my-10 mx-7 md:mx-60'>
                <motion.div
                    className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color='white' className='text-2xl font-bold font-inter'>
                        <u>My Profile</u>
                    </Typography>
                </motion.div>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-3'>
                        <SahyogCard name={profileData.name} number={profileData.emergencyContact} age={profileData.age} />
                        <div className='flex flex-col gap-1 mt-10'>
                            <ProfileData
                                label='Name'
                                content={profileData.name}
                                onChange={handleChange}
                            />
                            <ProfileData
                                label='Email'
                                content={profileData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-1 mb-1'>
                            <ProfileData
                                label='Age'
                                content={profileData.age}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5 '>
                        <Button size='sm' color='blue' className='text-md' onClick={() => navigate("/medicaldetails")}>
                            Upload Medical Details
                        </Button>
                        <Button size='sm' color='blue' className='text-md' onClick={() => navigate("/healthinsurance")}>
                            Upload Health Insurance
                        </Button>
                    </div>
                    <Button size='sm' color='red' className='mb-16 text-md' fullWidth onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            <Appbar />
        </>
    );
};

export default Profile;
