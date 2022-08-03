import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import "./settings.css";
import {
    faPen,
} from "@fortawesome/free-solid-svg-icons";
const Settings = () => {
    const [editAddress, setEditAddress] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [editName, setEditName] = useState(false);

    return (
        <section className='px-3 pt-20 lg:px-20 lg:pb-20 lg:pt-40 lg:flex w-full'>
            {/* right part */}
            <div className='w-full lg:w-1/2 order-2 p-3 lg:p-10 '>
                {/* user div */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 bg-white relative'>
                    <div className='w-full lg:flex lg:flex-row flex-col items-center '>
                        <div>
                            <figure className='flex justify-start items-center mb-3'>
                                <div className='h-44 w-44 bg-primary  rounded-full' ></div>
                            </figure>
                            <p className='w-44 text-primary text-left ml-4 lg:ml-0 lg:text-center cursor-pointer font-semibold' >change photo</p>

                        </div>
                        <div className="w-full">
                            <input disabled={!editName} className='input input-text text-3xl lg:text-left text-center bg-white w-44 lg:w-full' type="text" value='users Name' />
                        </div>
                    </div>
                    <div className='absolute top-3 right-3'>
                        <div onClick={() => setEditName(true)} className={`${editName && "hidden"} cursor-pointer col-span-3 place-self-center`}>
                            <FontAwesomeIcon
                                className=' text-gray-500'
                                icon={faPen}
                            />
                        </div>
                        <div className={`${!editName && "hidden"} cursor-pointer col-span-3 bg-primary px-4 py-2 text-white rounded place-self-center`}>
                            save
                        </div>
                    </div>
                </div>

                {/* general options section */}
                <div className='rounded-lg p-5 w-full lg:w-10/12 mt-3 bg-white '>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-xl text-left mb-3'>Addintional </h3>

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
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl text-left mb-3'>Address</h3>
                        <div onClick={() => setEditAddress(true)} className={`${editAddress && "hidden"} cursor-pointer col-span-2`}>
                            <FontAwesomeIcon
                                className=' text-gray-500'
                                icon={faPen}
                            />
                        </div>
                        <div className={`${!editAddress && "hidden"} cursor-pointer col-span-2 bg-primary px-4 py-2 text-white rounded`}>
                            save
                        </div>
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
                    <div className='flex justify-between items-center '>
                        <h3 className='text-xl text-left mb-3'>Contact informations</h3>
                        <div onClick={() => setEditContact(true)} className={`${editContact && "hidden"} cursor-pointer col-span-2`}>
                            <FontAwesomeIcon
                                className=' text-gray-500'
                                icon={faPen}
                            />
                        </div>
                        <div className={`${!editContact && "hidden"} cursor-pointer col-span-2 bg-primary px-4 py-2 text-white rounded`}>
                            save
                        </div>
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

                    </div>

                    {/* options container */}

                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5'>
                        {/* Current Password */}
                        <input className='input input-password ' type="password" value='Current Password' />

                        <input className='input input-password ' type="password" value='New Password' />
                        <div type="submit" className='btn max-w-min btn-primary'>change</div>
                    </form>

                </div>

                {/* delete div */}
                <div className='p-5 lg:px-20 lg:pt-20 lg:pb-0 '>
                    <div className='btn pl-0  text-error btn-ghost bg-white-b-2 bg-white-b-error rounded-none'>Delete Account</div>

                </div>
            </div>
        </section>
    );
};

export default Settings;