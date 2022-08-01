import React from "react";
import "./Countdown.css";

const Countdown = () => {

    return (
        <div className="pb-10 lg:pb-20">
            {/* bonus heading div */}
            <div className="mb-20">
                <h2 className="text-3xl text-center font-bold font-sans text-primary">
                    Get your new user <span className="text-error text-4xl">$25</span> bonus before times out!
                </h2>
                {/* stats count div */}
                <div>

                </div>
            </div>

        </div>
    );
}

export default Countdown;