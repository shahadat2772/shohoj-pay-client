import React from 'react';


const BalanceSection = ({ balance }) => {

    return (
        <div className='bg-blue-100 rounded-lg w-full p-10'>
            <h4 className='text-2xl'>Your Balance </h4>
            <h2 className='text-6xl font-bold my-7'>${balance}</h2>
            <p className=''>26 August, 2022</p>
        </div>
    );
};

export default BalanceSection;