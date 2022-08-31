import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RevenueCard = () => {
  const date = new Date().toLocaleDateString("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [shohojPayInfo, setShohojPayInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    try {
      setInfoLoading(true);
      fetch("http://localhost:5000/getShohojPayInfo", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setShohojPayInfo(data);
          setInfoLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      setInfoLoading(false);
    }
  }, []);

  return (
    <div className="px-2">
      <div className="lg:px-12 md:px-12 py-8 ">
        <h4 className="mb-5 text-xl ml-2">Total Revenue</h4>
        {!infoLoading ? (
          <h1 className="lg:text-6xl md:text-6xl text-5xl font-medium">
            ${shohojPayInfo?.revenue}
          </h1>
        ) : (
          <h1 className="text-6xl font-medium">Loading...</h1>
        )}
        <p className="mt-6 ml-2">{date}</p>
      </div>
    </div>
  );
};

export default RevenueCard;
