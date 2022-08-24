import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCreditCard,
    faPaperPlane,
    faHandHoldingDollar,
    faCircleDollarToSlot,
    faSackDollar,
    faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// All services
const services = [
    {
        id: "add-money",
        serviceName: "Add Money",
        serviceIcon: faCreditCard,
    },
    {
        id: "merchant-to-personal",
        serviceName: "M to P",
        serviceIcon: faPaperPlane,
    },
    {
        id: "merchant-to-merchant",
        serviceName: "M to M",
        serviceIcon: faPaperPlane,
    },
    {
        id: "get-paid",
        serviceName: "Get Paid",
        serviceIcon: faHandHoldingDollar,
    },
];

const MerchantServices = () => {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen">
            <div className="servicesContainer pt-28 pb-32">
                <h1 className="textColor md:text-4xl text-3xl font-medium mb-12 text-center">
                    User your <span className="text-primary">powers!</span>
                </h1>
                {/* Services */}
                <div className="services grid lg:grid-cols-3 md:lg:grid-cols-3 grid-cols-2 gap-6 lg:gap-14 md:gap-14 w-fit mx-auto justify-items-center">
                    {/* Each service */}
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => navigate(`/merchant/services/${service.id}`)}
                            className="eachService cursor-pointer h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 shadow rounded-xl flex items-center justify-center flex-col"
                        >
                            <div className="icon bg-blue-100 rounded p-3">
                                <FontAwesomeIcon
                                    className="lg:text-5xl md:text-5xl text-3xl text-secondary"
                                    icon={service.serviceIcon}
                                />
                            </div>
                            <h3 className="serviceName lg:text-2xl md:text-2xl text-xl mt-4">
                                {service.serviceName}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MerchantServices;