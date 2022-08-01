import React from "react";
import "./UserFlow.css";

const UserFlow = () => {
  return (
    <div className="container mx-auto py-20 lg:mt-10">
      {/* GRID USERFLOW CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 bg-white rounded p-5  md:px-4 sm:px-4">
        <div className="px-5 flow-1">
          <div className="flex items-center mb-8">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-user-plus text-4xl"></i>
            </a>
          </div>
          <h1 className="text-center text-xl">Create account</h1>
          <p className="text-center text-sm lg:px-4">
            Aspernatur sit adipisci quaerat unde at neque Redug Lagre dolor sit
            amet consectetu. Agencies to define their new business objectives
            and then create
          </p>
        </div>

        {/* USERFLOW CARD */}
        <div className="px-5 flow-2">
          <div className="flex items-center mb-8">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-credit-card text-4xl"></i>
            </a>
          </div>
          <h1 className="text-center text-xl">Add Money</h1>
          <p className="text-center text-sm lg:px-4">
            Aspernatur sit adipisci quaerat unde at neque Redug Lagre dolor sit
            amet consectetu. Agencies to define their new business objectives
            and then create
          </p>
        </div>
        {/* USERFLOW CARD */}
        <div className="px-5 flow-3">
          <div className="flex items-center mb-8">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-earth-americas text-4xl"></i>
            </a>
          </div>
          <h1 className="text-center text-xl">Start Transaction</h1>
          <p className="text-center text-sm lg:px-4">
            Aspernatur sit adipisci quaerat unde at neque Redug Lagre dolor sit
            amet consectetu. Agencies to define their new business objectives
            and then create
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserFlow;
