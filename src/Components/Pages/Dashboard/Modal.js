import React from "react";

const Modal = ({ modalData }) => {
  const todayDate = new Date().toLocaleDateString();
  console.log(modalData);
  return (
    <div>
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative ">
          <label
            htmlFor="details-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <div className="flex items-center justify-between">
            <h3 class="text-lg font-bold">{modalData?.type}</h3>
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
              <div className="flex items-center">
                <div className="w-14 rounded-full mr-4">
                  <img
                    src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                    alt="User Image"
                  />
                </div>
                <div>
                  <h6 className="font-bold">
                    {modalData?.userName
                      ? modalData?.userName
                      : modalData?.name}
                  </h6>
                  <h6 className="">
                    {modalData?.to ? modalData?.to : modalData?.email}
                  </h6>
                  {modalData?.transactionId && (
                    <h6 className="">{modalData?.transactionId}</h6>
                  )}
                </div>
              </div>
              <h3
                className={`text-2xl amount-style font-medium  text-right ${
                  modalData?.type === "Add Money" ||
                  modalData?.type === "Receive Money"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {modalData?.type === "Add Money" ||
                modalData?.type === "Receive Money"
                  ? "+" + modalData?.amount
                  : "-" + modalData?.amount}
                $
              </h3>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
