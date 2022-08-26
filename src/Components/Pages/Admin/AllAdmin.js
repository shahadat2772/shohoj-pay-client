import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllAdmin = () => {
  const [admins, setAdmin] = useState([]);

  const fetchAdmins = () => {
    fetch("http://localhost:5000/getAllAdmin", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRemove = (email) => {
    console.log(email);
    fetch("http://localhost:5000/manageAdmin", {
      method: "PUT",
      headers: {
        email: email,
        action: "remove",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error, { id: "manageAdmin" });
        } else if (data?.success) {
          fetchAdmins();
          toast.success(data?.success, { id: "manageAdmin" });
        } else {
          toast.error("Something went wrong.", { id: "manageAdmin" });
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl mt-8">All Admins</h1>
      <div className="overflow-x-auto w-full mt-8">
        <table className="table w-[90%]">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row  --> */}
            {admins &&
              admins.map((admin) => {
                const { name, email, avatar, address, number } = admin;
                console.log(admin);
                return (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                avatar
                                  ? avatar
                                  : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{name}</div>
                          <div className="text-sm opacity-50">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {address && address}
                      <br />
                      {/* <span className="badge badge-ghost badge-sm">{number}</span> */}
                    </td>
                    <td>{number && number}</td>
                    <th>
                      <button
                        onClick={() => handleRemove(email)}
                        className="btn btn-ghost btn-xs"
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdmin;
