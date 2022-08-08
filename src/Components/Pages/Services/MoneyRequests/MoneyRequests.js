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
      <div className="btn-group ml-10 mt-8 mb-4">
        <button
          onClick={() => setType("incoming")}
          className="btn btn-outline btn-sm"
        >
          Incoming
        </button>
        <button
          onClick={() => setType("outgoing")}
          className="btn btn-outline btn-sm"
        >
          Outgoing
        </button>
      </div>
      <div className="requests max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Status</th>
                {type === "incoming" && <th>Approval</th>}
              </tr>
            </thead>
            <tbody>
              {/* Each request */}
              {requests?.map((request, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    {type === "incoming"
                      ? request?.requesterName
                      : request?.donorName}
                  </td>
                  <td>{request?.amount}</td>
                  <td>{request.status}</td>
                  <td>
                    {type === "incoming" && request?.status === "pending" && (
                      <button
                        onClick={() => handleApprove(request)}
                        className="btn btn-xs btn-outline"
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
