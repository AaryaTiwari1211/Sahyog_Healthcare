import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import { MdDocumentScanner } from "react-icons/md";
import SahyogCard from "../components/Sahyogcard/SahyogCard";
import { UserProfile, useUser } from "@clerk/clerk-react";
import { db } from "../components/FirebaseSDK";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dark } from "@clerk/themes";
import Appbar from "../components/appbar/Appbar";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [uploadedMedicalDetails, setUploadedMedicalDetails] = useState(false);
  const [uploadedHealthInsurance, setUploadedHealthInsurance] = useState(false);
  const [medicalRecordsUrl, setMedicalRecordsUrl] = useState(null);
  const [healthInsuranceUrl, setHealthInsuranceUrl] = useState(null);

  const getMedicalRecordFile = async () => {
    const userDocRef = doc(db, "users", user.id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const url = docSnap.data().medicalRecords;
      setMedicalRecordsUrl(url);
    }
  };

  const getHealthInsuranceFile = async () => {
    const userDocRef = doc(db, "users", user.id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const url = docSnap.data().healthInsurance;
      setHealthInsuranceUrl(url);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        if (docSnap.data().medicalRecords) {
          setUploadedMedicalDetails(true);
          await getMedicalRecordFile();
        }
        if (docSnap.data().healthInsurance) {
          setUploadedHealthInsurance(true);
          await getHealthInsuranceFile();
        }
      }
    };
    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-10 my-10 mx-7 md:mx-60">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography color="white" className="text-2xl font-bold font-inter">
            <u>My Profile</u>
          </Typography>
        </motion.div>
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col gap-3">
            <SahyogCard
              name={userData?.name}
              number={userData?.phone}
              age={userData?.age}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            {medicalRecordsUrl ? (
              <a href={medicalRecordsUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" color="green" className="text-md">
                  View Medical Records
                </Button>
              </a>
            ) : (
              !uploadedMedicalDetails && (
                <Button
                  size="sm"
                  color="blue"
                  className="text-md"
                  onClick={() => navigate("/medicaldetails")}
                >
                  Upload Medical Details
                </Button>
              )
            )}
            {healthInsuranceUrl ? (
              <a href={healthInsuranceUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" color="green" className="text-md">
                  View Health Insurance
                </Button>
              </a>
            ) : (
              !uploadedHealthInsurance && (
                <Button
                  size="sm"
                  color="blue"
                  className="text-md"
                  onClick={() => navigate("/healthinsurance")}
                >
                  Upload Health Insurance
                </Button>
              )
            )}
          </div>
          <UserProfile
            appearance={{
              baseTheme: dark,
              elements: {
                card: "margin-0",
              },
            }}
          />
        </div>
      </div>
      <Appbar />
    </>
  );
};

export default Profile;
