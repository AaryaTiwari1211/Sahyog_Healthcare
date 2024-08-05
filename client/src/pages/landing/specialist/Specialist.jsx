import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Appbar from '../../../components/appbar/Appbar';
import { Button, Typography } from "@material-tailwind/react";
import { doc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../../../components/FirebaseSDK';
import Loader from '../../../components/Loader';
import { useUser } from '@clerk/clerk-react';

const Specialist = () => {
    const [specialists, setSpecialists] = useState([]);
    const [currentSpecialist, setCurrentSpecialist] = useState(null);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useUser();

    const handlePhoneClick = () => {
        const phoneNumber = currentSpecialist?.phone;
        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const handleOnChat = async () => {
        try {
            console.log('User:', user.user.id);
            console.log('Current Specialist:', currentSpecialist.id);
            if (!currentSpecialist || !user.user) return;
    
            const filteredChats = chats.filter(chat => chat.users.includes(currentSpecialist.id));
            if (filteredChats.length > 0) {
                const existingChatId = filteredChats[0].id;
                navigate(`/chat/${existingChatId}`);
            } else {
                const chatDocRef = await addDoc(collection(db, 'chats'), {
                    users: [user.user.id, currentSpecialist.id],
                    messages: [],
                });
                console.log('Chat created with ID:', chatDocRef.id);
                navigate(`/chat/${chatDocRef.id}`);
            }
        } catch (error) {
            console.error('Error creating or checking chat:', error.message);
        }
    };

    const handleOnClick = () => {
        const text = "Hi, I want to book an appointment can you please let me know if it's possible and also the details.";
        window.open(`https://wa.me/7999250587?text=${encodeURIComponent(text)}`, "_blank");
    };

    useEffect(() => {
        const fetchChats = async () => {
            const querySnapshot = await getDocs(collection(db, 'chats'));
            const chatsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setChats(chatsData);
        };
        fetchChats();
    }, []);

    useEffect(() => {
        const fetchSpecialist = async () => {
            setLoading(true);
            try {
                const specialistDocRef = doc(db, 'specialists', id);
                const specialistDoc = await getDoc(specialistDocRef);
                if (specialistDoc.exists()) {
                    setCurrentSpecialist({ id: specialistDoc.id, ...specialistDoc.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching specialist:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialist();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!currentSpecialist) {
        return <div>No specialist data found.</div>;
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col mt-[100px] ml-4 h-screen overflow-scroll'>
                <div className='flex flex-col gap-1 mb-3'>
                    <Typography color='white' className='text-3xl font-bold font-inter'>
                        {currentSpecialist.name}
                    </Typography>
                    <Typography color='gray' className='text-white text-md font-inter'>
                        {currentSpecialist.degree}
                    </Typography>
                </div>
                <div>
                    <img src={currentSpecialist.photoSrc} alt="Specialist Photo" />
                </div>
                <div className='flex flex-col gap-1'>
                    <Typography color='white' className='mt-5 text-xl font-bold text-white font-inter'>
                        About
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] text-white'>
                        {currentSpecialist.about}
                    </Typography>
                </div>
                <div className='flex flex-col gap-1'>
                    <Typography color='white' className='mt-5 text-xl font-bold text-white font-inter'>
                        Qualifications
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] text-white'>
                        {currentSpecialist.qualifications}
                    </Typography>
                </div>
                <div className='flex flex-col gap-1'>
                    <Typography color='white' className='mt-5 text-xl font-bold text-white font-inter'>
                        Books and Theses
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] text-white'>
                        {currentSpecialist.books}
                    </Typography>
                </div>
                <div className='flex flex-col gap-1'>
                    <Typography color='white' className='mt-5 text-xl font-bold text-white font-inter'>
                        Contact Details
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] text-white'>
                        <ul>
                            <li onClick={handlePhoneClick} style={{ cursor: 'pointer' }}>
                                Phone Number: {currentSpecialist.phone}
                            </li>
                            <li>Email: {currentSpecialist.email} </li>
                        </ul>
                    </Typography>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between gap-3 mt-5 mr-5 mb-28'>
                        <Button className='border-2 border-[#65ADE1]' variant='outlined' size='sm' onClick={handleOnClick}>
                            <div className='text-white'>
                                Book an Appointment
                            </div>
                        </Button>
                        <Button className='border-2 border-[#65ADE1]' variant='outlined' size='sm' onClick={handleOnChat}>
                            <div className='text-white'>
                                Chat
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <Appbar />
        </>
    );
};

export default Specialist;
