import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useUser from "../Hooks/useUser";
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [firebaseuser, loading] = useAuthState(auth);
    const [admin, setAdmin] = useState({})
    // const [admin] = useUser(firebaseuser?.email);
    useEffect(() => {
        if (firebaseuser?.email) {
            fetch("http://localhost:5000/getUserInfo", {
                method: "GET",
                headers: {
                    email: firebaseuser.email
                },

            }).then(res => res.json()).then(data => {
                setAdmin(data)
            })
        }
    }, [firebaseuser?.email]);
    // console.log(admin)
    const fetchUsers = (email) => {
        if (email) {
            fetch('http://localhost:5000/getalluser', {
                method: "GET",
                headers: {
                    email: email
                }
            })
                .then(res => res.json())
                .then(data => setUsers(data))
        }
    }
    useEffect(() => {
        if (admin.email) {
            fetchUsers(admin.email)
        }

    }, [users, admin]);

    if (!users || loading || !admin) {
        return <Spinner />
    };


    const handlMakeAdmin = (user) => {
        // console.log(user, 'is now admin');
        // console.log("")
        const updatedUser = {
            type: 'admin'
        }
        fetch(`http://localhost:5000/makeadmin/:${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                email: admin.email
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => fetchUsers(admin.email));
    }
    return (
        <div className='py-5 lg:py-24 px-5 lg:px-20'>
            <h1 className='font-medium lg:text-3xl text-xl text-center lg:text-left text-primary uppercase' >Make Admin</h1>
            <table className='w-full my-5 text-xs lg:text-lg  font-p'>
                <thead>
                    <tr className=''>
                        <td></td>
                        <td className='font-bold text-primary'>Name</td>
                        <td className='font-bold text-primary'>Email</td>
                        <td className='font-bold text-primary'>type</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        users.map((user, index) => <tr key={user._id} className={` h-10  ${index % 2 === 0 && 'bg-white'}`}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>{user.type === 'personal' && <button onClick={() => handlMakeAdmin(user)} className='btn btn-xs text-[0.5rem] p-1 lg:text-xs lg:px-3 btn-success text-white rounded-full'>
                                Make Admin
                            </button>}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;