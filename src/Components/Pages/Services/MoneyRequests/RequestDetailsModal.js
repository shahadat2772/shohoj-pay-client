import React from 'react';

const RequestDetailsModal = ({
    request
}) => {
    return (
        <div>
            <input
                type="checkbox"
                id="request-details-modal"
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