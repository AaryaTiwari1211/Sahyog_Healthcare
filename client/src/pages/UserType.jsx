// import { Button } from '@material-tailwind/react'
// import { doc, getDoc, setDoc } from 'firebase/firestore'
// import { useEffect } from 'react'
// import { db } from '../components/FirebaseSDK'
// import { useUser } from '@clerk/clerk-react'
// import { useNavigate } from 'react-router-dom'
// import Loader from '../components/Loader'
// import { useState } from 'react'
// import React from 'react'



// const UserType = () => {
//     const user = useUser();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const setDoctorDocuments = async () => {
//         await setDoc(doc(db, "users", user.user.id), {
//             type: 'doctor',
//             name: user.user.fullName,
//             email: user.user.primaryEmailAddress.emailAddress,
//             uid: user.user.id,
//             photoURL: user.user.imageUrl,
//             age: "",
//             specialization: "",
//             experience: "",
//             qualification: "",
//             books: "",
//             bio: "",
//             fee: "",
//             degree: "",
//             clinic: "",
//             address: "",
//         }, { merge: true });

//         await setDoc(doc(db, "doctors", user.user.id), {
//             name: user.user.fullName,
//             email: user.user.primaryEmailAddress.emailAddress,
//             uid: user.user.id,
//             photoURL: user.user.imageUrl,
//             age: "",
//             specialization: "",
//             experience: "",
//             qualification: "",
//             books: "",
//             bio: "",
//             fee: "",
//             degree: "",
//             clinic: "",
//             address: "",
//         }, { merge: true });
//     }
    
//     const setPatientDocuments = async () => {
//         await setDoc(doc(db, "users", user.user.id), {
//             type: 'patient',
//             name: user.user.fullName,
//             email: user.user.primaryEmailAddress.emailAddress,
//             uid: user.user.id,
//             photoURL: user.user.imageUrl,
//             age: "",
//             emergencyContact: "",
//             medicalRecords: [],
//             healthInsurance: [],
//             allergies: [],
//             bloodGroup: "",
//             height: "",
//             weight: "",
//         }, { merge: true });

//         await setDoc(doc(db, "patients", user.user.id), {
//             name: user.user.fullName,
//             email: user.user.primaryEmailAddress.emailAddress,
//             uid: user.user.id,
//             photoURL: user.user.imageUrl,
//             age: "",
//             emergencyContact: "",
//             medicalRecords: [],
//             healthInsurance: [],
//             allergies: [],
//             bloodGroup: "",
//             height: "",
//             weight: "",
//         }, { merge: true });
//     }

//     // const handleClick = async (type) => {
//     // if (!user.user) return;

//     // setLoading(true);

//     // try {
//     //     if (type === 'doctor') {
//     //         await setDoctorDocuments();
//     //     } else {
//     //         await setPatientDocuments();
//     //     }
        
//     //     console.log("Documents added successfully");
//     //     navigate('/landing');
//     // } catch (error) {
//     //     console.error("Error adding documents:", error);
//     //     // Handle error (e.g., show error message to user)
//     // } finally {
//     //     setLoading(false);
//     // }
// }

//     useEffect(() => {
//         const checkUser = async () => {
//             const userRef = doc(db, "users", user.user.id);
//             const userSnap = await getDoc(userRef);
//             console.log(userSnap.data());
//         }
//         if (user.user) checkUser();
//     }, [user.user]);

//     return (
//         <div className='flex flex-col items-center justify-center h-screen gap-10'>
//             <h1 className='text-2xl text-white'>Are you a doctor or a patient?</h1>
//             <div className="flex flex-col w-32 gap-10">
//                 <Button onClick={handleClick("doctor")} color='blue' className='mt-4'>Doctor</Button>
//                 <Button onClick={handleClick("patient")} color='blue' className='mt-4'>Patient</Button>
//             </div>
//             {loading && <Loader />}
//         </div>
//     )
// }

// export default UserType