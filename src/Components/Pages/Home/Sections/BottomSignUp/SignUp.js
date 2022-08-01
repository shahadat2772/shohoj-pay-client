import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    return (
        <div className="sign-up p-20 lg:p-28 text-center">
            <h1 className='text-white text-4xl lg:text-6xl pb-10 lg:pb-16'>Join the millions of users worldwide trusting Shohoj Pay everyday</h1>
            <Link to={'/signUp'} className='bg-white hover:bg-purple-300 text-xl py-2 px-12 rounded-full font-semibold'>Sign Up For Free</Link>
        </div>
    );
};

export default SignUp;