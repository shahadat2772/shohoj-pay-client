import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminSummary = () => {
  const [shohojPayInfo, setShohojPayInfo] = useState();

  useEffect(() => {
    try {
      fetch("http://localhost:5000/getShohojPayInfo")
        .then((res) => res.json())
        .then((data) => {
          setShohojPayInfo(data);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  return (
    <div className="pt-4">
      <p className="ml-1">Revenue</p>
      <h2 className="text-6xl mt-2 font-medium">
        <span className="pr-1">$</span>
        {shohojPayInfo?.revenue}
      </h2>
    </div>
  );
};

export default AdminSummary;
