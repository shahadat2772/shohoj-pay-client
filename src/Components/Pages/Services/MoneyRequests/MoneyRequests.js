import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";
import RequestDetailsModal from "./RequestDetailsModal";

const MoneyRequests = ({ setRequestForConfirm }) => {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState([]);
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
              className={`btn btn-primary btn-outline btn-sm ${type === "incoming" && "btn-active"
                }`}
            >
              Incoming
            </button>
            <button
              onClick={() => setType("outgoing")}
              className={`btn btn-primary btn-outline btn-sm ${type !== "incoming" && "btn-active"
                }`}
            >
              Outgoing
            </button>
          </div>
          {requests.length === 0 ? (
            <div className="min-h-[60vh] flex justify-center items-center">
              <h2 className="text-2xl">
                You have no {`${type === "incoming" ? "incoming" : "outgoing"}`}{" "}
                requests ;(
              </h2>
            </div>
          ) : (
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
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
                    <td
                      onClick={() => setRequest(request)}
                    >
                      <label
                        htmlFor="request-details-modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </label>

                    </td>
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
                        className={`${request.status === "Pending"
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
                          className={`btn btn-xs btn-outline btn-primary ${request.status === "Approved" && "btn-disabled"
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
          )}
        </div>
      </div>
      <RequestDetailsModal
        request={request}
      />
    </div>
  );
};

export default MoneyRequests;
