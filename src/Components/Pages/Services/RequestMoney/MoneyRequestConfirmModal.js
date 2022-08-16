import React from "react";
import toast from "react-hot-toast";

const MoneyRequestConfirmModal = ({
  requestInfo,
  setRequestForConfirm,
  fetchRequests,
}) => {
  const handleApprove = (request) => {
    toast.loading("Request is being confirmed.", {
      id: "moneyRequestLoadingToast",
    });
    fetch("https://shohoj-pay-server.herokuapp.com/approveRequestMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ requestMoneyInfo: request }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRequestForConfirm([]);
        fetchRequests();
        if (data?.success) {
          toast.dismiss("moneyRequestLoadingToast");
          toast.success(data?.success);
        } else {
          toast.error(data?.error);
        }
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="MoneyRequestConfirmModal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold">Approve request?</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="actionButtons mt-4">
            <button
              onClick={() => handleApprove(requestInfo)}
              className="btn btn-sm btn-outline btn-primary mr-3"
            >
              Confirm
            </button>
            <button
              onClick={() => setRequestForConfirm([])}
              className="btn btn-sm btn-outline btn-warning"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyRequestConfirmModal;
