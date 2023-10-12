"use client"
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'
const SignInButton = () => {
    const {data: session} = useSession();
    console.log(session); //debug

    if(session && session.user) {
        return (
            <div className='flex gap-4 ml-auto'>
                <p className='text-gray-600 dark:text-gray-400'>{session.user.name}</p> 
                <button onClick={() => signOut()} className='text-red-600'>
            Sign out
        </button>
        </div>
    );
    }

return (
    <button onClick={() => signIn()} className='text-blue-600 ml-auto'>
        Sign in
    </button>
    );
}
export default SignInButton;
