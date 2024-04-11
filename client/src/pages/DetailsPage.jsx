import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { Typography } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react';
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { db } from '../components/FirebaseSDK';
import { doc, getDoc } from 'firebase/firestore';

const DetailButton = ({ text, onClick, uploaded = false }) => {
    return (
        <Button variant="outlined" color='white' className={`flex flex-row justify-between p-6 text-sm font-normal ${uploaded ? "bg-green-500" : " bg-blue-500"} font-inter whitespace-nowrap`} onClick={onClick}>
            {text}
            <FaChevronRight />
        </Button>
    )
}

const DetailsPage = () => {
    const navigate = useNavigate();
    const [uploadedMedicalDetails, setUploadedMedicalDetails] = useState(false);
    const [uploadedHealthInsur, setUploadedHealthInsur] = useState(false);
    const user = useUser();
    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, 'users', user.user.id);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                if (docSnap.data().medicalRecords) {
                    setUploadedMedicalDetails(true);
                    console.log('Medical Details are Uploaded');
                }
                if (docSnap.data().healthInsurance) {
                    setUploadedHealthInsur(true);
                    console.log('Health Insurance Details are Uploaded');
                }
                if (docSnap.data().name && docSnap.data().age && docSnap.data().uid) {
                    console.log('Basic Info is Uploaded');
                }
            }
            else {
                console.log('No user data found');
            }
        }
        if (user.user) {
            fetchUserData();
        }
    }, [])
    return (
        <>
            <div className='flex flex-col gap-24 my-10 mx-7 items md:mx-60'>
                <motion.div className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color='white' className='text-3xl font-bold font-inter'>Hey There!!</Typography>
                    <Typography color='blue' className='font-inter'>So tell us about yourself !!</Typography>
                </motion.div>
                <div className='flex flex-col gap-8'>
                    <DetailButton text='Basic Medical Details' onClick={() => navigate('/basicinfo')} />
                    <DetailButton text='Previous Diagnostic records' onClick={() => navigate('/medicaldetails')} uploaded={uploadedMedicalDetails} />
                    <DetailButton text='Health Insurance Details' onClick={() => navigate('/healthinsurance')} uploaded={uploadedMedicalDetails} />
                    <Button variant="outlined" color='white' className="bg-blue-500 font-inter text-md" onClick={() => navigate('/landing')}>Skip</Button>
                </div>
            </div>
        </>
    )
}

export default DetailsPage