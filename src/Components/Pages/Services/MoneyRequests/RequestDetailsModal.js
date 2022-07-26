import React from "react";
import Trow from "./Trow";

const RequestDetailsModal = ({ request }) => {
  const {
    requesterName,
    donorName,
    amount,
    reference,
    date,
    payFor,
    productOrServiceName,
    description,
  } = request;

  const commonProps = {
    Requester: requesterName,
    Donor: donorName,
    Amount: amount,
    Date: date,
  };
  const merchantProps = {
    "Pay for": payFor,
    "Product / Service": productOrServiceName,
    Description: description,
  };

  return (
    <div>
      <input
        type="checkbox"
        id="request-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold my-3 text-center">
            Request Details
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <tbody>
                {Object.keys(commonProps).map((key) => (
                  <Trow key={key} propkey={key} value={commonProps[key]} />
                ))}

                {reference && <Trow propkey={"Reference"} value={reference} />}
                {payFor &&
                  Object.keys(merchantProps).map((key) => (
                    <Trow key={key} propkey={key} value={merchantProps[key]} />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="actionButtons mt-4">
            <label
              htmlFor="request-details-modal"
              className="btn btn-sm btn-outline btn-primary mr-3"
            >
              Got it
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
