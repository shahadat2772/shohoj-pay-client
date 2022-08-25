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
          {/* <h3 class="text-lg font-bold">{modalData?.type}</h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p> */}
          <h5 className="font-bold text-lg md-type-responsive ">
            {modalData?.type}
          </h5>
          <h5 className="gray text-sm mb-1 md-responsive">
            {modalData?.fullDate === todayDate ? "Today" : modalData?.fullDate}
          </h5>
          <div className="mt-10">
            <div className="flex items-center">
              <div className="w-14 md-img-responsive rounded-full mr-4">
                <img
                  src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                  alt="User Image"
                />
              </div>
              <div>
                <h5 className="font-bold text-lg md-type-responsive ">
                  {modalData?.type}
                </h5>
                <h6 className="gray md-responsive">{modalData?.userName}</h6>
                {modalData?.transactionId && (
                  <h6 className="gray md-trx-responsive">
                    {modalData.transactionId}
                  </h6>
                )}
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
