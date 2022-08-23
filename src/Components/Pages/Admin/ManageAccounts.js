import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ManageAccounts = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = () => {
    fetch("http://localhost:5000/getAllUser", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const updateUserStatus = (email, action) => {
    fetch("http://localhost:5000/updateAccountStatus", {
      method: "PUT",
      headers: {
        email: email,
        action: action,
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          fetchAllUsers();
          toast.success(data.success, {
            id: "accStatusUpdateToast",
          });
        } else if (data?.error) {
          toast.error(data.error, {
            id: "accStatusUpdateToast",
          });
        } else {
          toast.error("Something went wrong.", {
            id: "accStatusUpdateToast",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl mt-4">Manage Accounts</h2>
      <div class="overflow-x-auto w-full mt-8">
        <table class="table w-[90%]">
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
            {users &&
              users.map((user) => {
                const { name, email, avatar, address, number } = user;
                return (
                  <tr>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div class="mask mask-squircle w-12 h-12">
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
                          <div class="font-bold">{name}</div>
                          <div class="text-sm opacity-50">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {address && address}
                      <br />
                      {/* <span class="badge badge-ghost badge-sm">{number}</span> */}
                    </td>
                    <td>{number && number}</td>
                    <th>
                      <button
                        // onClick={() => handleRemove(email)}
                        class="btn btn-ghost btn-xs"
                      >
                        Details
                      </button>
                      <br />
                      {user.status === "active" ? (
                        <button
                          onClick={() => updateUserStatus(email, "deactive")}
                          class="btn btn-ghost btn-xs"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => updateUserStatus(email, "active")}
                          class="btn btn-ghost btn-xs"
                        >
                          Activate
                        </button>
                      )}
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

export default ManageAccounts;
