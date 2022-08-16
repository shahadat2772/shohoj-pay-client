import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const MoneyRequests = ({ setRequestForConfirm }) => {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const [requests, setRequests] = useState([]);
  const [type, setType] = useState("incoming");

  const fetchRequests = () => {
    fetch("http://localhost:5000/getRequests", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: email,
        type: type,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [user, type]);

  return (
    <div className="min-h-screen">
      <h2 className="mt-24 text-[1.70rem] text-center textColor">
        Money Requests
      </h2>

      <div className="requests max-w-7xl mx-auto">
        <div className="overflow-x-auto md:max-w-6xl max-w-[95%] mx-auto">
          <div className="btn-group mt-8 mb-4">
            <button
              onClick={() => setType("incoming")}
              className={`btn btn-primary btn-outline btn-sm ${
                type === "incoming" && "btn-active"
              }`}
            >
              Incoming
            </button>
            <button
              onClick={() => setType("outgoing")}
              className={`btn btn-primary btn-outline btn-sm ${
                type !== "incoming" && "btn-active"
              }`}
            >
              Outgoing
            </button>
          </div>
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
                {type === "outgoing" && <th>Status</th>}
                {type === "incoming" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {/* Each request */}
              {requests?.map((request, index) => (
                <tr key={index}>
                  <td>
                    {type === "incoming"
                      ? request?.requesterName
                      : request?.donorName}
                  </td>
                  <td>{type === "incoming" ? request?.from : request?.to}</td>
                  <td>${request?.amount}</td>
                  <td>{request?.date}</td>
                  <td>{request?.time}</td>
                  {type === "outgoing" && (
                    <td
                      className={`${
                        request.status === "Pending"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {request.status}
                    </td>
                  )}
                  {type === "incoming" && (
                    <td>
                      <label
                        htmlFor="MoneyRequestConfirmModal"
                        // onClick={() => handleApprove(request)}
                        onClick={() =>
                          setRequestForConfirm([request, fetchRequests])
                        }
                        className={`btn btn-xs btn-outline btn-primary ${
                          request.status === "Approved" && "btn-disabled"
                        }`}
                      >
                        Approve{request.status === "Approved" && "d"}
                      </label>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MoneyRequests;
