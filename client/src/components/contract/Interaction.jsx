// import { ArcanaProvider } from "../../App"
// import { ethers } from "ethers";
// import { useAuth } from "@arcana/auth-react";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/constants";
// import { useContext, createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../FirebaseSDK";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export const Interaction = createContext();

// export const InteractionProvider = ({ children }) => {
//     const [userAddress, setUserAddress] = useState("");
//     const { user, isLoggedIn, connect } = useAuth();
//     const [loading, setLoading] = useState(false);
//     const [userData, setUserData] = useState({});
//     const [userType, setUserType] = useState(null);

//     const navigate = useNavigate();
//     const addTOFirebase = async (user) => {
//         const userDocRef = doc(db, 'users', user.publicKey);
//         const docSnapshot = await getDoc(userDocRef);
//         if (!docSnapshot.exists()) {
//             await setDoc(userDocRef, {
//                 userID: user.publicKey,
//                 email: user.email,
//                 name: user.name,
//             });
//             console.log("User added to firestore");
//         }
//         else {
//             console.log("User already exists");
//         }
//     }

//     // if (!isLoggedIn) {
//     //     connect();
//     // }

//     useEffect(() => {
//         if (user) {
//             addTOFirebase(user);
//             setUserAddress(user.address);
//             console.log(user);
//         }
//     }, [user]);

//     const provider = new ethers.providers.Web3Provider(ArcanaProvider.provider);

//     const signer = provider.getSigner();

//     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//     const storeUserDetails = async (age, gender, name, phoneNumber) => {
//         setLoading(true);
//         const tx = await contract.storeUserDetails(age, gender, name, phoneNumber);
//         try {
//             const transaction = await tx.wait();
//             transaction.transactionHash ?
//                 setLoading(false) :
//                 alert("Transaction failed please submit the form again");
//             setLoading(false);
//             navigate('/medicaldetails');
//         }
//         catch (err) {
//             console.log(err);
//         }
//     };

//     const storeMedicalDetails = async (medicalDetails) => {
//         setLoading(true);
//         const transactionHash = await contract.storeUserData(medicalDetails);
//         try {
//             const transaction = await transactionHash.wait();
//             transaction.transactionHash ?
//                 setLoading(false) :
//                 alert("Transaction failed please submit the form again");
//             setLoading(false);
//             navigate('/healthinsurance');
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }

//     const storeInsuranceDetails = async (medicalDetails) => {
//         setLoading(true);
//         const transactionHash = await contract.storeUserData(medicalDetails);
//         try {
//             const transaction = await transactionHash.wait();
//             transaction.transactionHash ?
//                 setLoading(false) :
//                 alert("Transaction failed please submit the form again");
//             setLoading(false);
//             navigate('/landing');
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }

//     const getUserData = async () => {
//         try {
//             const userDataGet = await contract.getUserRecords(userAddress);
//             console.log(userDataGet);
//             setUserData(userDataGet);
//         }
//         catch (err) {
//             console.log(err.errorArgs);
//         }
//     };

//     useEffect(() => {
//         getUserData();
//     }, [userAddress])

//     const [userDetails, setUserDetails] = useState(null);

//     const getUserDetails = async (userAddress) => {
//         try {
//             const details = await contract.getUserDetails(userAddress);
//             setUserDetails(details);
//             console.log('User details retrieved successfully', details);
//         } catch (error) {
//             console.error('Failed to retrieve user details:', error);
//         }
//     };

//     const stopSharingData = async () => {
//         setLoading(true)
//         try {
//             const transaction = await contract.stopSharingData();
//             const receipt = await transaction.wait();
//             console.log(receipt.transactionHash);
//             getUserData(userAddress)
//             setLoading(false)
//             getUserData();
//             navigate('/profile')
//         }
//         catch (err) {
//             console.log(err);
//             alert(err);
//         }
//     };

//     const startSharingData = async () => {
//         setLoading(true)
//         try {
//             const transaction = await contract.startSharingData();
//             const receipt = await transaction.wait();
//             console.log(receipt.transactionHash);
//             setLoading(false)
//             getUserData();
//             navigate('/profile')
//         }
//         catch (err) {
//             console.log(err);
//             alert(err);
//         }
//     };

//     const deleteUserData = async (userAddress) => {
//         setLoading(true)
//         try {
//             const transaction = await contract.deleteUserRecords(userAddress);
//             const receipt = await transaction.wait();
//             console.log(receipt.transactionHash);
//             setLoading(false)
//             getUserData();
//             navigate('/profile')
//         }
//         catch (err) {
//             console.log(err);
//             alert(err);
//         }
//     };

//     useEffect(() => {
//         getUserDetails(userAddress);
//     }, [userAddress]);


//     return (
//         <Interaction.Provider value={{ storeUserDetails, loading, storeMedicalDetails, storeInsuranceDetails, userData, userDetails, stopSharingData, startSharingData, deleteUserData, getUserData, setUserType, userType }}>
//             {children}
//         </Interaction.Provider>
//     );
// }