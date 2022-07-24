import React from "react";
import KeyPoint from "./KeyPoint";

// data array
const keyPoints = [
  {
    id: 1,
    title: "Low transaction fee",
    description:
      "We want to help you transfer your balance, not to lose them in the transaction hole! So, we'll cost you a little.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 stroke-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Fast payment method",
    description:
      "Your time is valuable to us. So, we made the system faster to save your time. ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 stroke-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Highly Sequred transaction",
    description:
      "We give the most priority to the security. Relax, here your money is safer than in your pocket.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 stroke-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Highly Sequred transaction",
    description:
      "We give the most priority to the security. Relax, here your money is safer than in your pocket.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 stroke-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const WhyUs = () => {
  return (
    <section className="p-10  lg:p-20 text-center px-5">
      {/* section header */}
      <div>
        <h3 className="text-3xl font-bold mb-10 text-primary">
          Why <span className="border-b-4 border-black pb-1">Choose</span> us?
        </h3>
        <p className="">
          There are a vast of applications in the market that can provide you
          Financial Services. <br /> But what make us stand out from the crowd?
        </p>
      </div>
      {/* features cards' part */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
        {keyPoints.map((e) => (
          <KeyPoint
            key={e.id}
            title={e.title}
            description={e.description}
            icon={e.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
