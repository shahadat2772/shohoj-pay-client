import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className='bg-gray-50'>
            < div className='flex justify-evenly lg:justify-center items-center relative ' >
                <h1 className='text-center uppercase text-primary font-semibold text-3xl lg:text-4xl mt-24 mb-10'>Admin Dashboard</h1>
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                    </label>
                </div>
            </div >

            <div className='lg:flex lg:relative absolute font-p'>
                <div className="drawer drawer-mobile max-w-sm">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                    <div className=" drawer-side ">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 rounded overflow-y-auto w-80 bg-white text-base-content">
                            <li><Link to="makeadmin">Make Admin</Link></li>
                            <li><Link to="makeadmin">Make Admin</Link></li>
                            <li><Link to="makeadmin">Make Admin</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='lg:flex-grow lg:block hidden'>
                    <Outlet />
                </div>
            </div>
            <div className='lg:flex-grow lg:hidden'>
                <Outlet />
            </div>

        </div >
    );
};

export default AdminDashboard;