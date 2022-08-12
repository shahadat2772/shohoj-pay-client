import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Spinner from '../../../Shared/Spinner/Spinner';
import useUser from '../../Hooks/useUser';


const RequireAdmin = ({ children }) => {
    const [firebaseUser, loading] = useAuthState(auth);
    const [mongoUser] = useUser(firebaseUser?.email);

    if (!mongoUser?.type || loading) {
        return <Spinner />
    }
    if (mongoUser.type !== 'admin' && mongoUser.name !== "Abdulla Al Mahfuz Swaron") {
        return <Navigate to='/dashboard' />
    }
    return children
};

export default RequireAdmin;