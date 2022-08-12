import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [dShow, setDShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const link = [{ name: "Home", link: "/" }];

  const restrictedLinks = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Services", link: "/services" },
    { name: "Request", link: "/moneyRequests" },
    { name: "Settings", link: "/settings" },
  ];
  // USER INFO
  useState(() => {
    fetch("http://localhost:5000/getUserInfo", {
      method: "GET",
      headers: {
        email: user?.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);
  console.log(userData);

  // on scroll hide and show navbar functionality
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(true);
      } else {
        // if scroll up show the navbar
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  // RESPONSIVE TOGGLER BTN STATE
  const [open, setOpen] = useState(false);
  // ONCLICK NAVIGATE
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };
  const handleSignOut = () => {
    signOut(auth);
    toast.success("Sign Out Successfully");
  };
  return (
    <nav className={`active ${show && "hidden"}`}>
      <div className="fixed top-0 w-[100%]">
        <div className="nav-active px-4 py-2 lg:rounded-2xl lg:p-0 lg:m-4 lg:mt-2">
          <div className="p-1 lg:px-8 md:px-4">
            <nav className="flex items-center justify-between">
              {/* PROJECT LOGO */}
              <div>
                <Link to="/">
                  <img
                    src="/assets/logos/logo-horizontal.png"
                    className="w-40"
                    alt=""
                  />
                  {/* {logo} */}
                </Link>
              </div>
              <div className="ml-20">
                {" "}
                {/* NAV ITEM */}
                <ul
                  className={`lg:flex w-100 lg:h-auto lg:w-full block lg:items-center navbar absolute duration-500 ease-in lg:static top-16 lg:bg-transparent bg-white overflow-hidden ${
                    open ? "left-[-10px] top-16" : "left-[-1080px]"
                  }`}
                >
                  {link.map((item) => (
                    <li key={item.name} className="block text-center">
                      <NavLink to={item.link}>{item.name}</NavLink>
                    </li>
                  ))}
                  {/* Routes for authenticated users   */}
                  {user &&
                    restrictedLinks.map((item) => (
                      <li key={item.name} className="block text-center">
                        <NavLink to={item.link}>{item.name}</NavLink>
                      </li>
                    ))}
                  {/* RESPONSIVE LOGIN OR SIGN UP  BUTTON */}
                  <div className=" flex items-center justify-center lg:hidden">
                    {user ? (
                      <button
                        onClick={handleSignOut}
                        className="btn hover:bg-transparent border-2 hover:text-secondary border-secondary hover:border-secondary bg-secondary  text-white btn-sm lg:mx-4 "
                      >
                        Sign Out
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleNavigateLogin}
                          className="btn bg-transparent border-2 text-secondary hover:border-secondary hover:bg-secondary border-secondary hover:text-white btn-sm mr-3"
                        >
                          Login
                        </button>
                        <button
                          onClick={handleNavigateSignUp}
                          className=" btn bg-[#3F4AD9] hover:bg-primary border-0 btn-sm"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>

                  {/* LARGE DEVICE LOGIN OR SIGN UP BUTTON */}
                  {user ? (
                    <>
                      <div class="text-center">
                        <div
                          className="avatar hover:cursor-pointer relative"
                          tabIndex="5"
                        >
                          <div className="w-10 rounded-full mr-2">
                            <img
                              className="object-top"
                              // src={profile[0] ? profile[0].image : noImg}
                              src="https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                              alt={user?.displayName}
                              onClick={() => setDShow(!dShow)}
                            />
                          </div>
                        </div>
                        {dShow && (
                          <div className=" absolute top-20 rounded-2xl right-40 bg-base-200 py-2 w-64 px-3 overflow-hidden z-40">
                            <div className="avatar mx-auto my-3">
                              <div className="w-24 rounded-full">
                                <img
                                  className="object-top"
                                  src="https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                                  alt={userData?.name}
                                />
                              </div>
                            </div>
                            <h2 className="font-bold text-primary mb-3">
                              {userData?.name}
                            </h2>
                            <div className=" bg-white rounded-xl text-black ">
                              <div className="text-left mt-4 bg-white px-3 py-1 rounded-xl">
                                <p className="text-secondary font-bold">
                                  Email:
                                </p>
                                <h2 className="font-bold text-xl">
                                  <small>{user?.email}</small>
                                </h2>
                              </div>
                              <div className="text-left bg-white px-3 py-1 rounded-xl">
                                <p className="text-secondary font-bold">
                                  Phone:
                                </p>
                                <h2 className="font-bold text-xl">
                                  <small>{userData?.phone}</small>
                                </h2>
                              </div>
                              <button
                                onClick={handleSignOut}
                                className="btn hover:bg-transparent border-2 hover:text-secondary border-secondary hover:border-secondary bg-secondary  text-white btn-sm w-full"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleNavigateLogin}
                        className="btn bg-transparent border-2 text-secondary hover:border-secondary hover:bg-secondary border-secondary hover:text-white btn-sm lg:mx-4 hidden lg:block"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleNavigateSignUp}
                        className="btn bg-primary hover:bg-[#1d27af] text-white border-0 btn-sm hidden lg:block"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </ul>
              </div>
              {/* NAVBAR TOGGLER ICON */}
              <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10 lg:hidden"
              >
                {open ? (
                  <XIcon className="text-primary"></XIcon>
                ) : (
                  <MenuIcon className="text-primary"></MenuIcon>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
