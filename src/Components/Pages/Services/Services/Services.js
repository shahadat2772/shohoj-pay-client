import React from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faPaperPlane,
  faHandHoldingDollar,
  faCircleDollarToSlot,
  faSackDollar,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  { id: 1, serviceName: "Add Money", serviceIcon: faCreditCard },
  { id: 2, serviceName: "Send Money", serviceIcon: faPaperPlane },
  { id: 4, serviceName: "Request Money", serviceIcon: faHandHoldingDollar },
  { id: 5, serviceName: "Save Money", serviceIcon: faCircleDollarToSlot },
  { id: 3, serviceName: "eCheck", serviceIcon: faMoneyCheckDollar },
  { id: 6, serviceName: "Loan Request", serviceIcon: faSackDollar },
];

const Services = () => {
  return (
    <section className="min-h-screen">
      <div className="servicesContainer pt-28 pb-32">
        <h1 className="servicesHeader text-4xl font-medium mb-12 text-center">
          A lot to <span className="text-primary">do!</span>
        </h1>
        <div className="services grid grid-cols-3 gap-14 w-fit mx-auto justify-items-center">
          {services.map((service) => (
            <div className="eachService h-56 w-56 shadow rounded-xl flex items-center justify-center flex-col">
              <div className="icon bg-blue-200 rounded p-3">
                <FontAwesomeIcon
                  className="text-5xl text-secondary"
                  icon={service.serviceIcon}
                />
              </div>
              <h3 className="serviceName text-2xl mt-4 text-secondary">
                {service.serviceName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
