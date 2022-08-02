import React from "react";
import "./Countdown.css";
import Stat from "./Stat";
import client from "../../../../../Images/counter-up-logo/icons8-person-tipping-hand-96.png"
import merchant from "../../../../../Images/counter-up-logo/icons8-bookshop-96.png"
import partner from "../../../../../Images/counter-up-logo/icons8-handshake-96.png"
import country from "../../../../../Images/counter-up-logo/icons8-globe-96.png"

// countup data 
const countUp = [
    { id: 1, icon: client, title: 'Happy Client', figure: 12000 },
    { id: 2, icon: merchant, title: 'Merchant', figure: 480 },
    { id: 3, icon: partner, title: 'Official Partner', figure: 144 },
    { id: 4, icon: country, title: 'Country', figure: 13 }
]

const Countdown = () => {
    return (
        <div className=" text-center bg py-10 lg:py-20" >
            {/* bonus heading div */}
            <div>
                <h2 className="text-3xl text-center font-bold font-sans text-primary">
                    Get your new user <span className="text-error text-4xl">$25</span> bonus before times out!
                </h2>
                <h1 className="text-3xl lg:text-5xl m-10 lg:m-16 p-2 font-semibold">Real People. Real Relationships.</h1>
                {/* stats count div */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 lg:mb-20'>
                    {
                        countUp.map((e) => <Stat
                            key={e.id}
                            e={e}>
                        </Stat>)
                    }
                </div>
            </div>

        </div>
    );
}

export default Countdown;