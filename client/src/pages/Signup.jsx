import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <span className="text-white text-3xl font-bold ">
          Welcome to Sahyog
        </span>
        <span className="text-white text-xl font-bold">
          Please Signup to Continue
        </span>
      </div>
      <SignUp
        path="/signup"
        redirectUrl="/landing"
        routing="path"
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox:
              "w-full mt-20 flex flex-col justify-center items-center gap-6",
          },
        }}
        signInUrl="/login"
      />
    </div>
  );
};

export default Signup;
