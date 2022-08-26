import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Pagination from "../../Shared/Pagination/Pagination";

const ManageAccounts = () => {
  const [users, setUsers] = useState([]);
  // const [filterData, setFilterData] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);

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
  // START PAGINATION
  let PageSize = 15;
  const paginateUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users, PageSize]);
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
  const handleFindUser = (e) => {
    // console.log(users);
    // const searchData = users.filter((user) =>
    //   user.email.includes("akib@gmail.com")
    // );
    console.log(e.target.value);
  };
  // const handleFindUser = (e) => {
  //   const searchData = users?.filter((user) =>
  //     user?.email.includes(e.target.value)
  //   );
  //   // setSearch(searchData);
  //   console.log(searchData);
  //   console.log(e.target.value);
  // };
  return (
    <div>
      <h2 className="text-3xl mt-4">Manage Accounts</h2>
      <input
        onChange={handleFindUser}
        type="text"
        placeholder="Find Account By Email"
        class="input input-bordered input-primary w-full max-w-xs"
      />
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
              paginateUsers.map((user) => {
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
        <div className={`mt-8  ${users.length < 10 && "hidden"}`}>
          {/* START PAGINATION */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={users?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAccounts;
