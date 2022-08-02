import React, { useState } from 'react';
import "./settings.css";

const Settings = () => {
    const [editAddress, setEditAddress] = useState(false);
    const [editContact, setEditContact] = useState(false);

    return (
        <section className='px-5 pt-20 lg:px-20 lg:pb-20 lg:pt-40 lg:flex w-full'>
            {/* right part */}
            <div className='w-full lg:w-1/2 order-2 p-10'>
                {/* user div */}
                <div className='py-10'>
                    <div className='w-full lg:w-10/12 '>
                        <figure className='flex justify-end mb-3'>
                            <div className='h-48 w-48 bg-white  rounded-full' ></div>
                        </figure>
                        <h3 className='text-4xl text-right font-semibold'>User Name</h3>
                    </div>
                </div>

                {/* general options section */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 bg-white '>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-xl text-left mb-3'>Addintional </h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-2'>

                        {/* email subscription  */}
                        <div className='flex space-x-4'>
                            <input type={"checkbox"} className="toggle checkbox-secondary" /><p> Recieve Monthly Report</p>
                        </div>
                        {/* email subscription  */}
                        <div className='flex space-x-4'>
                            <input type={"checkbox"} className="toggle checkbox-secondary" /><p> Recieve Monthly Report</p>
                        </div>
                        {/* email subscription  */}
                        <div className='flex space-x-4'>
                            <input type={"checkbox"} className="toggle checkbox-secondary" /><p> Recieve Monthly Report</p>
                        </div>
                        {/* email subscription  */}
                        <div className='flex space-x-4'>
                            <input type={"checkbox"} className="toggle checkbox-secondary" /><p> Recieve Monthly Report</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* left part  */}
            <div className=' w-full lg:w-1/2 grid grid-cols-1 gap-5 p-5'>
                {/* address section */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 place-self-end  bg-white '>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-xl text-left mb-3'>Address</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-2'>

                        {/* address */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center font-semibold ">Address:</label>
                            <input disabled={!editAddress} className='input input-text  bg-white col-span-5' type="text" value='City, Country' />
                        </form>
                        <hr />
                        {/* zip code */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center font-semibold ">Zip:</label>
                            <input disabled={!editAddress} className='input bg-white col-span-5' type="number" value='3822' />
                        </form>

                    </div>

                </div>

                {/* contact div */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 bg-white '>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-xl text-left mb-3'>Contact informations</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-2'>

                        {/* Email */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center font-semibold ">Email:</label>
                            <input disabled={!editContact} className='input input-text  bg-white col-span-5' type="email" value='Email' />
                        </form>
                        <hr />
                        {/* phone number */}

                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center font-semibold ">Phone :</label>
                            <input disabled={!editContact} className='input input-text  bg-white col-span-5' type={"tel"} value='Phone Number' />
                        </form>


                    </div>
                </div>

                {/* security div */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 bg-white '>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-xl text-left mb-3'>Security</h3>
                        <hr />
                    </div>

                    {/* options container */}

                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5'>
                        {/* Current Password */}
                        <input className='input input-password ' type="password" value='Current Password' />

                        <input className='input input-password ' type="password" value='New Password' />
                        <button type="submit" className='btn max-w-min btn-primary'>change</button>
                    </form>

                </div>

                {/* delete div */}
                <div className='p-5 lg:px-20 lg:pt-20 lg:pb-0 '>
                    <button className='btn pl-0  text-error btn-ghost bg-white-b-2 bg-white-b-error rounded-none'>Delete Account</button>

                </div>
            </div>
        </section>
    );
};

export default Settings;