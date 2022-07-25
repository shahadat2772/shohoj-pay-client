import React from "react";
import "./Dashboard.css";
const fakeUserData = [
  {
    _id: 1,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 465,
  },
  {
    _id: 2,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 345,
  },
  {
    _id: 3,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 545,
  },
  {
    _id: 4,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 235,
  },
  {
    _id: 5,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 955,
  },
  {
    _id: 6,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    location: "Location",
    money: 713,
  },
];
const Dashboard = () => {
  return (
    <div className="container mx-auto mt-24 lg:mt-28 lg:px-10 py-10">
      <div className="lg:flex">
        <div>
          <div class="md:mx-10 lg:mx-0 card lg:w-96 shadow-xl bg-primary text-white py-5 rounded card-1-bg">
            <div class="card-body">
              <h1 className="text-left text-4xl font-bold">User Name</h1>
              <h5 class="text-left">UserEmail@gmail.com</h5>

              <div class="card-actions justify-start text-3xl">
                <h1>$5464</h1>
              </div>
            </div>
          </div>
          <div className="mt-10 text-left md:mx-10 mx-5 lg:mx-0">
            <h3 className="font-bold text-xl border-b border-black">
              Recent Transaction
            </h3>
            <div className="mt-8">
              <ul>
                {fakeUserData.map((transAction) => (
                  <li
                    className="flex items-center my-4 p-3 rounded-lg shadow-lg"
                    key={transAction._id}
                  >
                    <div class="avatar">
                      <div class="w-16 rounded-full ">
                        <img src={transAction.img} />
                      </div>
                    </div>
                    <div className="ml-5 flex items-center justify-between w-full">
                      <div>
                        <h3 className="font-bold text-lg">
                          {transAction.name}
                        </h3>
                        <h5>{transAction.location}</h5>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          ${transAction.money}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div class="divider divider-horizontal divide-black px-9 divider-hidden"></div>
        <div className="w-full">
          {/* <div>
            
          </div> */}
          <div class="card  shadow-xl rounded bg-image py-10 text-white">
            <div class="card-body">
              <h3 className="text-xl">Hi User!</h3>
              <div className="mt-2">
                <h3 className="font-bold text-xl">
                  Have a Shohoj Day With Shohoj Pay
                </h3>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing.</h5>
                <button className="btn btn-primary mt-4">Button</button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>Setting</h3>
              <div></div>
            </div>
            <div>
              <h3>Setting</h3>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
