import React from 'react';
import CountUp from 'react-countup';
import plus from '../../../../../Images/counter-up-logo/icons8-plus-math-48.png';

const Stat = ({ e }) => {
    const { icon, title, figure } = e;
    return (
        <div className='flex items-center justify-center'>
            <div className='m-2'>
                <img className='fluid' src={icon} alt="" />
            </div>
            <div>
                <div className='flex items-center justify-center'>
                    <CountUp
                        end={figure}
                        className="text-xl lg:text-3xl font-bold" />
                    <img className='w-[35px]' src={plus} alt="" />
                </div>
                <h2 className='text-lg lg:text-xl font-mono font-bold'>{title}</h2>
            </div>
        </div>
    );
};

export default Stat;