// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button, IconButton, Typography, Spinner } from '@material-tailwind/react';
// import { FaUpload } from 'react-icons/fa';

// import { Input, Select, Label, Option } from '@material-tailwind/react';
// import Appbar from '../components/appbar/Appbar';
// import { Interaction } from '../components/contract/Interaction';
// import { useContext } from 'react';
// import { useAuth } from '@arcana/auth-react';
// import { MdDocumentScanner } from "react-icons/md";
// import SahyogCard from '../components/Sahyogcard/SahyogCard';



// const ProfileData = ({ label, content, isEditable, onChange }) => {

//     return (
//         <div className='flex flex-col gap-2 '>
//             <Typography color='white' className='text-lg font-bold text-blue-500 font-inter'>
//                 {label}
//             </Typography>
//             {isEditable ? (
//                 <Input
//                     type='text'
//                     value={content}
//                     className='text-white outline-none'
//                     onChange={(e) => onChange(label.toLowerCase(), e.target.value)}
//                 />
//             ) : (
//                 <Typography color='white' className='text-2xl font-bold font-inter'>
//                     {content}
//                 </Typography>
//             )}
//         </div>
//     );
// };

// const Profile = () => {


//     const { user } = useAuth();

//     // console.log(user.address);

//     const { userData, userDetails, stopSharingData, startSharingData, loading, deleteUserData, getUserData} = useContext(Interaction);
//     const [age, gender, name, phoneNumber] = userDetails || [];

//     const initialProfileData = {
//         name: name,
//         email: user.email,
//         age: age && age.toNumber(),
//         contact: phoneNumber,
//     };


//     const [profileData, setProfileData] = useState(initialProfileData);
//     const [isEditable, setIsEditable] = useState(false);

//     const handleChange = (field, value) => {
//         setProfileData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));
//     };

//     const handleClick = () => {
//         setIsEditable(!isEditable);
//     };

//     useEffect(() => {
//         console.log(userData);
//         getUserData();
//     }, [])


//     return (
//         <> {loading && (
//             <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
//                 <Spinner color="blue" className='w-12 h-12' />
//                 <Typography color="white" className="text-xl ">
//                     Uploading...
//                 </Typography>
//             </div>
//         )}
//             <div className='flex flex-col gap-10 my-10 mx-7 md:mx-60'>
//                 <motion.div
//                     className='flex flex-col gap-2'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <Typography color='white' className='text-2xl font-bold font-inter'>
//                         <u>My Profile</u>
//                     </Typography>
//                 </motion.div>
//                 <div className='flex flex-col gap-10'>
//                     <div className='flex flex-col gap-3'>
//                         <SahyogCard address={user.address} name={name} number={phoneNumber} age={age.toNumber()} gender={gender} />
//                         <div className='flex flex-col gap-1 mt-10'>
//                             <ProfileData
//                                 label='Name'
//                                 content={profileData.name}
//                                 isEditable={isEditable}
//                                 onChange={handleChange}
//                             />
//                             <ProfileData
//                                 label='Email'
//                                 content={profileData.email}
//                                 isEditable={isEditable}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className='flex flex-col gap-1 mb-1'>
//                             <ProfileData
//                                 label='Age'
//                                 content={profileData.age}
//                                 isEditable={isEditable}
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         <ProfileData
//                             label='Name of emergency Contact'
//                             content={profileData.emergencyContact}
//                             isEditable={isEditable}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <Button onClick={handleClick} color='blue' className='text-md'>
//                         {isEditable ? 'Save Changes' : 'Edit Profile'}
//                     </Button>
//                     <div className='grid grid-cols-2 gap-5 '>
//                         <Button size='sm' color='blue' className='text-md' onClick={() => stopSharingData()}>
//                             Revoke Access
//                         </Button>
//                         <Button size='sm' color='blue' className='text-md' onClick={() => startSharingData()}>
//                             Allow Access
//                         </Button>
//                     </div>
//                     <Button size='sm' color='red' className='text-md' fullWidth onClick={() => deleteUserData(user.address)}>
//                         Delete User Data
//                     </Button>
//                     <p className='text-white grid grid-cols-3 gap-28 self-center min-h-[34rem]'>
//                         {/* {userData[0] === 'This user is not sharing their Medical Records' ? "Please Allow access to view files here" : "Please Allow access to view records here"} */}
//                         {Array.isArray(userData) ? userData.map((url) => (
//                             <IconButton variant='text' className='flex items-center justify-center' onClick={() => window.open(url, "_blank")}>
//                                 <MdDocumentScanner className='w-20 h-20  text-color2' />
//                             </IconButton>
//                         )) : "Please add some files or You have revoked file access"}
//                     </p>
//                 </div>
//             </div>
//             <Appbar />
//         </>
//     );
// };

// export default Profile;
