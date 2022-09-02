import {
  faCreditCard,
  faHandHoldingDollar,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 rounded-lg w-full p-10">
      <h4 className="text-2xl mt-5 mb-10">Your Powers </h4>
      <div className=" grid grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(`/merchant/services/${service.id}`)}
            className="eachService cursor-pointer flex items-center justify-center flex-col"
          >
            <div className="icon bg-blue-100 rounded-full p-3 lg:p-5 md:p-5">
              <FontAwesomeIcon
                className="lg:text-4xl md:text-4xl text-2xl text-secondary"
                icon={service.serviceIcon}
              />
            </div>
            <h3 className="serviceName text-center lg:text-xl md:text-xl mt-4">
              {service.serviceName}
            </h3>
          </div>
        ))}
        <div
          onClick={() => navigate(`/merchant/money-requests`)}
          className="eachService cursor-pointer flex items-center justify-center flex-col"
        >
          <div className="icon bg-blue-100 rounded-full p-3 lg:p-5 md:p-5">
            <i class="fa-solid fa-down-left-and-up-right-to-center lg:text-4xl md:text-4xl text-2xl text-secondary"></i>
          </div>
          <h3 className="serviceName text-xl mt-4">Request</h3>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
