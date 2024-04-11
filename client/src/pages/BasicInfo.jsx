import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Spinner } from '@material-tailwind/react';
import { Input, Select, Option } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { db } from '../components/FirebaseSDK';
import { doc, setDoc, getDoc } from 'firebase/firestore';


const BasicInfo = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(user?.user?.fullName);
    const [userEmail, setUserEmail] = useState(user?.user?.primaryEmailAddress?.emailAddress);
    const [userGender, setUserGender] = useState("Male");
    const [userPhone, setUserPhone] = useState("");
    const [userAge, setUserAge] = useState(78);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, 'users', user.user.id);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                setUserName(docSnap.data().name);
                setUserEmail(docSnap.data().email);
            }
        }
        if (user.user) {
            fetchUserData();
        }
        if (userName && userEmail && userGender && userPhone && userAge) {
            setIsFormValid(true);
        }
        else {
            setIsFormValid(false);
        }
    }, [userName, userEmail, userGender, userPhone, userAge]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isFormValid) {
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.user.id);
            await setDoc(userDocRef, {
                name: userName,
                email: userEmail,
                gender: userGender,
                phone: userPhone,
                age: userAge,
            }, { merge: true });
            console.log('Basic Info Uploaded');
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
                    <Spinner color="blue" className='w-12 h-12' />
                    <Typography color="white" className="text-xl ">
                        Uploading...
                    </Typography>
                </div>
            )}
            <div className='flex flex-col gap-10 my-10 mx-7 md:mx-60'>
                <motion.div
                    className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color='white' className='text-3xl font-bold font-inter'>
                        Complete your Profile
                    </Typography>
                    <Typography className='font-inter text-color2 font-sm'>
                        You are almost done !!
                    </Typography>
                </motion.div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-12'>
                    <div className='flex flex-col gap-5'>
                        <Typography color='white' className='text-lg font-bold font-inter text-color1'>
                            Personal Details
                        </Typography>
                        <div className='flex flex-col gap-10 mb-1'>
                            <Input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                size='lg'
                                label={<span className='text-white'>Your Name</span>}
                                className='text-white border-2'
                            />
                            <Input
                                type='number'
                                onChange={(e) => setUserAge(e.target.value)}
                                value={userAge}
                                size='lg'
                                label={<span className='text-white'>Your Age</span>}
                                className='text-white border-2 '
                            />
                            <Select
                                onChange={(selectedOption) => setUserGender(selectedOption)}
                                value={userGender}
                                label={<span className='text-white'>Your Gender</span>}
                                className='text-white border-2'
                            >
                                <Option onClick={() => setUserGender("Male")} value='Male'>Male</Option>
                                <Option onClick={() => setUserGender("Female")} value='Female'>Female</Option>
                            </Select>
                            <Input
                                size='lg'
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                label={<span className='text-white'>Your Email</span>}
                                className='text-white border-2'
                            />
                            <Input
                                size='lg'
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                label={<span className='text-white'>Your Phone</span>}
                                className='text-white border-2'
                            />
                            <div className='flex justify-between'>
                                <Button type='submit' size='lg' color='blue' className='white' disabled={!isFormValid}>
                                    Submit
                                </Button>
                                <Button onClick={() => navigate('/details')} type='button' size='lg' color='blue' className='white'>
                                    Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BasicInfo;
