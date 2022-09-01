import React from "react";

const Modal = ({ modalData }) => {
  const todayDate = new Date().toLocaleDateString();
  console.log(modalData);
  return (
    <div>
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative ">
          <label
            htmlFor="details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{modalData?.type}</h3>
            <div className="mr-8">
              <h5 className="gray text-sm mb-1 ">
                {modalData?.fullDate === todayDate
                  ? "Today"
                  : modalData?.fullDate}
              </h5>
              <h5 className="gray text-sm mb-1 ">{modalData?.time}</h5>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="flex ">
                <div className=" mr-4">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={modalData?.image}
                    alt="User Image"
                  />
                </div>
                <div className="w-60">
                  <h6 className="font-bold">
                    {modalData?.userName
                      ? modalData?.userName
                      : modalData?.name}
                  </h6>
                  <h6 className="">
                    {modalData?.to ? modalData?.to : modalData?.email}
                  </h6>
                  {modalData?.transactionId && (
                    <small className="">
                      <span className="font-bold">TRX-ID: </span>
                      {modalData?.transactionId}
                    </small>
                  )}
                  {modalData?.reference && (
                    <h6 className="text-justify">
                      <span className="font-bold">Reference: </span>
                      {modalData?.reference}
                    </h6>
                  )}
                </div>
              </div>
              <div>
                <h3
                  className={`text-2xl  font-medium  text-right ${modalData?.type === "Add Money" ||
                      modalData?.type === "Receive Money" ||
                      modalData?.type === "Transfer Savings"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {modalData?.type === "Add Money" ||
                    modalData?.type === "Receive Money" ||
                    modalData?.type === "Transfer Savings"
                    ? "+" + modalData?.amount
                    : "-" + modalData?.amount}
                  $
                </h3>
                <h6 className="text-right">
                  <small className="gray text-sm">fee: ${modalData?.fee}</small>
                </h6>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
