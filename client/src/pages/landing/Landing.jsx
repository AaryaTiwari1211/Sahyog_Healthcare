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
import { collection, getDoc, setDoc, getDocs, doc, addDoc } from 'firebase/firestore';

const PersonCard = ({ photoSrc, id, name, degree, clickFunc }) => {
    return (
        <div className="flex flex-col items-center w-screen " onClick={() => clickFunc(id, name, degree, photoSrc)}>
            <div className="w-16 h-16 overflow-hidden border-2 border-blue-100 rounded-full">
                <img src={photoSrc} alt="Person Photo" className="object-cover w-full h-full" />
            </div>
            <div className="mt-3 text-center">
                <p className="font-bold text-white text-md whitespace-nowrap">{name}</p>
                <p className="text-sm text-gray-500">{degree}</p>
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

    useEffect(() => {
        async function fetchUser() {
            const userDocRef = doc(db, 'users', user.user.id);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
            }
            else {
                setDoc(userDocRef, {
                    name: user.user.fullName,
                    uid: user.user.id,
                    medicalRecords: [],
                    healthInsurance: [],
                })
                console.log('Document does not exist , Created a new one');
            }
        }
        if (user.user) {
            console.log(user.user);
            fetchUser();
        }
    }, []);

    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-col gap-16 mx-4 mt-10'>
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
                    <div className='flex items-center gap-5 jusitfy-center'>
                        <PersonCard id='0' name='Dr. Arpita' degree='MBBS' photoSrc={portrait} clickFunc={clickhandler} />
                        <PersonCard id='1' name='Dr. Svarna' degree='DMLT' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/22/22ec948f9e9b82f432de3b21f12b6ae4d2fd4c9d_full.jpg`} clickFunc={clickhandler} />
                        <PersonCard id='2' name='Dr. Manish' degree='MD, MB' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/d0/d01cd2452878017ff560867f6cd35e4c6a5b8dc6_full.jpg`} clickFunc={clickhandler} />
                        <PersonCard id='3' name='Dr. Arun' degree='Nil' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/6f/6f1e880b1dd5cdd8d4e8684e0be7f62be32b3a1d_full.jpg`} clickFunc={clickhandler} />
                    </div>
                    <div className='flex items-center gap-5 jusitfy-center'>
                        <PersonCard id='4' name='Dr. Rekha' degree='MSc' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/05a2d6dae2f97f0167a949bc24e5035ca69c3ec4_full.jpg`} clickFunc={clickhandler} />
                        <PersonCard id='5' name='Dr. Avni' degree='Phd' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/63/63be6ddc3f7e65fabfc18e8b3ee5fde5bdda623a_full.jpg`} clickFunc={clickhandler} />
                        <PersonCard id='6' name='Dr. Kishore' degree='MBBS' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/90/90e633ca07d1b797996592d2b42b5289e3f59328_full.jpg`} clickFunc={clickhandler} />
                        <PersonCard id='7' name='Dr. Atal' degree='MlT' photoSrc={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09baab373416aaf55bf476aba4ff9ee6611f30a7_full.jpg`} clickFunc={clickhandler} />
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