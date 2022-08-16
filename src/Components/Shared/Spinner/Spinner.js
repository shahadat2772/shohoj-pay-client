import React from "react";
import { HashLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-48 min-h-screen">
      <HashLoader color="#414CDA" />
    </div>
  );
};

export default Spinner;
