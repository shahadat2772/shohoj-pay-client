import React from 'react';

const Settings = () => {
    return (
        <section className='px-5 pt-20 lg:px-20 lg:pb-20 lg:pt-40 lg:flex w-full'>
            {/* right part */}
            <div className='border border-primary w-full lg:w-1/2 order-2 grid grid-cols-1 gap-5 p-5'>
                {/* user div */}
                <div className=''>
                    <div className=' '>
                        <figure className='flex justify-end mb-3'>
                            <div className='h-32 w-32 bg-blue-200 rounded-full' ></div>
                        </figure>
                        <h3 className='text-3xl text-right font-semibold'>User Name</h3>
                    </div>
                </div>

                {/* general options section */}
                <div className='rounded-xl p-3 lg:p-10 bg-slate-100'>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left'>General</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* Name */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-text input-secondary' type="text" placeholder='Name' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>
                        {/* postal code */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-number input-secondary' type="number" placeholder=' ' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>

                    </div>

                </div>
            </div>

            {/* left part  */}
            <div className='border border-secondary w-full lg:w-1/2 grid grid-cols-1 gap-5 p-5'>
                {/* address section */}
                <div className='rounded-xl p-3 lg:p-10 bg-slate-100'>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left'>Address</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* address */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-text input-secondary' type="text" placeholder='address' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>
                        {/* postal code */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-number input-secondary' type="number" placeholder='postal code' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>

                    </div>

                </div>

                {/* contact div */}
                <div className='rounded-xl p-3 lg:p-10 bg-slate-100'>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left'>Contact informations</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* Email */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-email input-secondary' type="email" placeholder='E-mail Address' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>
                        {/* phone number */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <input className='input input-tel input-secondary' type={"tel"} placeholder='Phone Number' />
                            <button className='btn max-w-min btn-primary'>change</button>
                        </div>

                    </div>
                </div>

                {/* security div */}
                <div className='rounded-xl p-3 lg:p-10 bg-slate-100'>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left'>Security</h3>
                        <hr />
                    </div>

                    {/* options container */}

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5'>
                        {/* Current Password */}
                        <input className='input input-password input-secondary' type="password" placeholder='Current Password' />

                        <input className='input input-password input-secondary' type="password" placeholder='New Password' />
                        <button className='btn max-w-min btn-primary'>change</button>
                    </div>
                </div>

                {/* delete div */}
                <div className='w-1/2 p-3 lg:p-10 '>
                    <button className='btn btn-outline btn-error ml-0 mb-3'>Delete Account</button>
                    <hr></hr>
                </div>
            </div>
        </section>
    );
};

export default Settings;