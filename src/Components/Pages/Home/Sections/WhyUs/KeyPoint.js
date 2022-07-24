import React from "react";

const KeyPoint = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-50 w-full p-10 rounded-lg">
      {/* card icon */}
      <figure className="w-24 h-24 mx-auto mb-5 bg-blue-50 rounded-full flex justify-center items-center">
        {icon}
      </figure>
      {/* card body */}
      <div>
        <h5 className="text-xl leading-10 font-medium">{title}</h5>
        <p className="leading-8 ">{description}</p>
      </div>
    </div>
  );
};

export default KeyPoint;
