import React from 'react';
import BalanceSection from './BalanceSection';
import ServicesSection from './ServicesSection';

const MerchantDashboard = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 py-32 lg:px-20 bg-white'>
            {/* left part */}
            <div className='lg:col-span-7 grid grid-cols-1 gap-5'>
                <BalanceSection />
                <ServicesSection />
            </div>

            {/* right part  */}
            <div></div>
        </div>
    );
};

export default MerchantDashboard;