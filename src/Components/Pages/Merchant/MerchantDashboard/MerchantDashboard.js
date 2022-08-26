import React from 'react';
import BalanceSection from './BalanceSection';

const MerchantDashboard = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 mt-32 lg:px-20'>
            {/* left part */}
            <div className='lg:col-span-7'>
                <BalanceSection />
            </div>

            {/* right part  */}
            <div></div>
        </div>
    );
};

export default MerchantDashboard;