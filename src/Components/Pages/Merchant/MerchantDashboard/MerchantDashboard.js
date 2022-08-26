import React, { useEffect } from 'react';
import BalanceSection from './BalanceSection';
import ServicesSection from './ServicesSection';
import Statistic from './Statistic';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserEmailInfo } from '../../../../app/features/userAllEmailInfoSlice';
import auth from '../../../../firebase.init';
import Spinner from '../../../Shared/Spinner/Spinner';

const MerchantDashboard = () => {
    const [user, loading, fError] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, allInfo, error } = useSelector(
        (state) => state.userAllEmailData
    );
    const { userBalance } = allInfo;
    useEffect(() => {
        dispatch(fetchUserEmailInfo(user));
    }, [navigate, dispatch, user]);
    if (isLoading || loading) {
        return <Spinner />
    }
    if (error || fError) {
        toast.error(error?.message || fError?.message);
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 py-32 lg:px-20 bg-white'>
            {/* left part */}
            <div className='lg:col-span-7 grid grid-cols-1 gap-5'>
                <BalanceSection balance={userBalance?.balance} />
                <ServicesSection />
            </div>

            {/* right part  */}
            <div className='grid lg:col-span-5 gap-5'>
                <Statistic />
            </div>
        </div>
    );
};

export default MerchantDashboard;