import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const MoneyRequests = () => {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const [requests, setRequests] = useState([]);
  console.log(requests);
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
        console.log(data);
        setRequests(data);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [user, type]);

  const handleApprove = (request) => {
    console.log(request);
    fetch("http://localhost:5000/approveRequestMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ requestMoneyInfo: request }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          fetchRequests();
          toast.success(data?.success);
        } else {
          toast.error(data?.error);
        }
      });
  };

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
                <th>Status</th>
                {type === "incoming" && <th>Approval</th>}
              </tr>
            </thead>
            <tbody>
              {/* Each request */}
              {requests?.map((request, index) => (
                <tr>
                  <td>
                    {type === "incoming"
                      ? request?.requesterName
                      : request?.donorName}
                  </td>
                  <td>{type === "incoming" ? request?.from : request?.to}</td>
                  <td>${request?.amount}</td>
                  <td>{request?.date}</td>
                  <td>{request?.time}</td>
                  <td
                    className={`${
                      request.status === "Pending"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td>
                    {type === "incoming" && request?.status === "Pending" && (
                      <button
                        onClick={() => handleApprove(request)}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Approve
                      </button>
                    )}
                  </td>
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
