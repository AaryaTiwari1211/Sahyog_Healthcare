
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn } from '@clerk/clerk-react'
import { dark } from "@clerk/themes";
import { useUser } from "@clerk/clerk-react";
import { db } from "../components/FirebaseSDK";
import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";

const Login = () => {
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user.user) {
            navigate("/landing");
        }
    }, []);

    return (
        <>
            <SignIn path="/login" appearance={{
                baseTheme: dark,
                elements: {
                    rootBox: "w-full h-screen flex flex-col justify-center items-center gap-6",
                }
            }}
                redirectUrl="/landing"
                signUpUrl="/signup"
            />
        </>
    );
};

export default Login;