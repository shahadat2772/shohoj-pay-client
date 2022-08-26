import { faCreditCard, faHandHoldingDollar, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const services = [
    {
        id: "add-money",
        serviceName: "Add Money",
        serviceIcon: faCreditCard,
    },
    {
        id: "get-paid",
        serviceName: "Get Paid",
        serviceIcon: faHandHoldingDollar,
    },
    {
        id: "merchant-echeck",
        serviceName: "E-Check",
        serviceIcon: faMoneyCheckDollar,
    }
];

const ServicesSection = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-50 rounded-lg w-full p-10'>
            <h4 className='text-2xl mt-5 mb-10'>Your Powers </h4>
            <div className=' grid grid-cols-4'>
                {
                    services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => navigate(`/merchant/services/${service.id}`)}
                            className="eachService cursor-pointer flex items-center justify-center flex-col"
                        >
                            <div className="icon bg-blue-100 rounded-full p-5">
                                <FontAwesomeIcon
                                    className="lg:text-5xl md:text-5xl text-3xl text-secondary"
                                    icon={service.serviceIcon}
                                />
                            </div>
                            <h3 className="serviceName  text-xl mt-4">
                                {service.serviceName}
                            </h3>
                        </div>
                    ))
                }
                <div

                    onClick={() => navigate(`/merchant/services`)}
                    className="eachService cursor-pointer flex items-center justify-center flex-col"
                >
                    <div className="icon bg-blue-100 rounded-full p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 fill-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                        </svg>

                    </div>
                    <h3 className="serviceName text-xl mt-4">
                        More
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default ServicesSection;