
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginNavigateTo, heading }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen bg">
                <h1 className="p-8 text-3xl font-black text-center text-color2">
                    {heading}
                </h1>
                <div>
                    <button
                        onClick={() => navigate(onLoginNavigateTo)}
                        className="w-1/2 p-3 m-4 text-xl font-bold text-center text-white bg-color2 rounded-2xl"
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
