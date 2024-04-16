import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Appbar from '../../../components/appbar/Appbar';
import docPhoto from '../../../assets/doctor.png';
import { Button } from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import { doc, getDoc, getDocs, collection, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../components/FirebaseSDK'
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { useUser } from '@clerk/clerk-react';

const Specialist = () => {
    const [specialists, setSpecialists] = useState([]);
    const [currentSpecialist, setCurrentSpecialist] = useState({});
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const handlePhoneClick = () => {
        const phoneNumber = '1234567890'; // Replace with the actual phone number
        window.location.href = `tel:${phoneNumber}`;
    };
    const user = useUser();

    useEffect(() => {
        const fetchChats = async () => {
            const querySnapshot = await getDocs(collection(db, 'chats'));
            const chatsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setChats(chatsData);
        };
        fetchChats();
    }, [])

    const handleOnChat = async () => {
        try {
            console.log(currentSpecialist.uid , user.user.id);
            const filteredChats = chats.filter(chat => {
                const chatUsers = chat.users;
                return chatUsers.includes(currentSpecialist.uid);
            });
            console.log('Filtered chats:', filteredChats);
            if (filteredChats.length > 0) {
                const existingChatId = filteredChats[0].id;
                console.log('Chat already exists. Redirecting to existing chat:', existingChatId);
                navigate(`/chat/${existingChatId}`);
            } else {
                const chatDocRef = await addDoc(collection(db, 'chats'), {
                    users: [user.user.id, currentSpecialist.uid],
                    messages: [],
                });
                console.log('New chat created with ID:', chatDocRef.id);
                navigate(`/chat/${chatDocRef.id}`);
            }
            return filteredChats; // Return the filtered chats array
        } catch (error) {
            console.error('Error creating or checking chat:', error.message);
        }
    };

    const handleOnClick = () => {
        const text = "Hi, I want to book an appointment can you please let me know if its possible and also the details."
        window.open(`https://wa.me/7999250587?text=${encodeURIComponent(text)}`, "_blank");
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const specialistDocRef = doc(db, 'specialists', id);
            const specialistDoc = await getDoc(specialistDocRef);
            console.log('Specialist doc:', specialistDoc);
            setCurrentSpecialist(specialistDoc.data());
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            {
                loading && <Loader />
            }
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
                        Books and Theises
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
                    <div className='flex justify-between gap-3 mt-5 mr-5 mb-28'  >
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
