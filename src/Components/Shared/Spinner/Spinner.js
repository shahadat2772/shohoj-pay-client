import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    // hashLoader Loading spinner 
    <div className="flex items-center justify-center">
      <HashLoader color="#00ffd4" />
    </div>
  );
};

export default Spinner;
