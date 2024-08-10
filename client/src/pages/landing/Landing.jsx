import { Typography, Input, Button } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import portrait from '../../assets/portrait.jpg';
import bannerLanding from '../../assets/banner-landing.png';
import Appbar from '../../components/appbar/Appbar';
import Navbar from '../../components/Navbar';
import routinePhoto from "../../assets/routines.png"
import { useUser } from '@clerk/clerk-react';
import { db } from '../../components/FirebaseSDK';
import { useState } from 'react';
import { collection, getDoc, setDoc, getDocs, doc, addDoc } from 'firebase/firestore';

const PersonCard = ({ photoSrc, id, name, degree, clickFunc }) => {
    return (
        <div className="flex flex-col items-center w-full" onClick={() => clickFunc(id, name, degree, photoSrc)}>
            <div className="w-16 h-16 overflow-hidden border-2 border-blue-100 rounded-full">
                <img src={photoSrc} alt="Person Photo" className="object-cover w-full h-full" />
            </div>
            <div className="mt-3 text-center">
                <p className="font-bold text-white text-md whitespace-nowrap">{name}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{degree}</p>
            </div>
        </div>
    );
};

const Landing = () => {

    const handleClick = () => {
        navigate('/spaces')
    }
    const navigate = useNavigate();
    const clickhandler = (id, photoSrc) => {
        navigate(`/specialist/${id}`, { state: { photoSrc } });
    };
    const user = useUser();
    const [specialists, setSpecialists] = useState([]);

    useEffect(() => {
        const fetchSpecialists = async () => {
            const querySnapshot = await getDocs(collection(db, 'specialists'));
            const specialistsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSpecialists(specialistsData);
            console.log(specialistsData);
        }
        const addUser = async () => {
            console.log(user.user);
            const userDocRef = doc(db, 'users', user.user.id);
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    name: user.user.fullName,
                    email: user.user.primaryEmailAddress.emailAddress,
                    id: user.user.id,
                    medicalRecords: "",
                    healthInsurance: "",
                    age: "",
                });
            }   
        }
        if (user.user) {
            addUser();
        }
        fetchSpecialists();
    }, []);

    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-col gap-16 mx-4 mt-10 '>
                <div className='flex flex-col gap-5' />
                <div className='flex flex-col gap-5'>
                    <Typography color='white' className='text-3xl font-bold font-inter'>For You</Typography>
                    <div className='rounded-[20px]' id='banner'>
                        <div className='flex items-center justify-between h-full px-5'>
                            <img src={bannerLanding} alt='banner' className='scale-125' onClick={handleClick} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <Typography color='white' className='mb-3 text-3xl font-bold font-inter'>Talk to a Specialist</Typography>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5'>
                        {
                            specialists.map((specialist, index) => (
                                <PersonCard key={index} photoSrc={specialist.photo ? specialist.photo : portrait} id={specialist.id} name={specialist.name} degree={specialist.degree} clickFunc={clickhandler} />
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <Typography color='white' className='text-3xl font-bold font-inter'>Daily routines</Typography>
                    </div>
                    <div>
                        <img src={routinePhoto} alt='banner' className='' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 mb-32'>
                    <div>
                        <Typography color='white' className='text-3xl font-bold font-inter'>Communities and Resources </Typography>
                    </div>
                    <div className='flex flex-col border-box gap-7'>
                        <iframe width="340" height="200" src="https://www.youtube.com/embed/QFbupLSlPLE?si=3IxYw1T2vLLsQqpG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <iframe width="340" height="200" src="https://www.youtube.com/embed/6ajmuRg2o3Q?si=voOqYUfOFt2PAB7W" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <Appbar />
        </div>
    );
};

export default Landing;