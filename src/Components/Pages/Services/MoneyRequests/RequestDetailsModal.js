import React from 'react';
import Trow from "./Trow";

const RequestDetailsModal = ({
    request
}) => {
    const { requesterName, donorName, amount, note, date, payFor, productOrServiceName, description } = request;

    const commonProps = {
        "Requester": requesterName,
        "Donor": donorName,
        "Amount": amount,
        "Date": date
    };
    const merchantProps = {
        "Pay for": payFor,
        "Product / Service": productOrServiceName,
        "Description": description
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
                    <h3 className="text-lg font-bold my-3 text-center">Request Details</h3>
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <tbody>
                                {
                                    Object.keys(commonProps).map(key => <Trow
                                        key={key}
                                        propkey={key}
                                        value={commonProps[key]}
                                    />
                                    )
                                }

                                {
                                    note && <Trow propkey={"Note"} value={note} />
                                }
                                {
                                    payFor && Object.keys(merchantProps).map(key => <Trow
                                        key={key}
                                        propkey={key}
                                        value={merchantProps[key]}
                                    />
                                    )
                                }

                            </tbody>

                        </table>
                    </div>
                    <div className="actionButtons mt-4">
                        <label
                            htmlFor='request-details-modal'
                            className="btn btn-sm btn-outline btn-primary mr-3"
                        >
                            Got it
                        </label>
                        {/* <button
                            onClick={() => setRequestForConfirm([])}
                            className="btn btn-sm btn-outline btn-warning"
                        >
                            Cancel
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsModal;