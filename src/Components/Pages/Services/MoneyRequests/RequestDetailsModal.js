import React from 'react';

const RequestDetailsModal = ({
    request
}) => {
    console.table(request)
    const { requesterName, donorName, amount, note, date } = request;

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
                                <tr>
                                    <td>Requester</td>
                                    <td>{requesterName}</td>
                                </tr>
                                <tr>
                                    <td>Donor</td>
                                    <td>{donorName}</td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>{amount}</td>
                                </tr>
                                {
                                    note && <tr>
                                        <td>Note</td>
                                        <td>{note}</td>
                                    </tr>
                                }
                                <tr>
                                    <td>Date</td>
                                    <td>{date}</td>
                                </tr>
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