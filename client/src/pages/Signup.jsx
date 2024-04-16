import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

const Signup = () => {
    return (
        <div>
            <SignUp
                path="/signup"
                redirectUrl="/landing"
                routing="path"
                appearance={{
                    baseTheme: dark,
                    elements: {
                        rootBox: "w-full h-screen flex flex-col justify-center items-center gap-6",
                    }
                }}
                signInUrl='/login'
            />
        </div>
    )
}

export default Signup