import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import useUser from "../../Pages/Hooks/useUser";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname;
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, loading] = useAuthState(auth);
  const [mongoUser, mongoUserLoading] = useUser(user);
  const { signUpLoading } = useSelector((state) => state.signUpLoading);
  const { unseenNotifications } = useSelector((state) => state.allNotification);

  const unAuthorizedRoutes = [{ name: "Home", link: "/" }];
  const personalUserRoutes = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Services", link: "/services" },
  ];

  const merchantUserRoutes = [
    { name: "Dashboard", link: "/merchant/dashboard" },
    { name: "Services", link: "/merchant/services" },
  ];

  const commonRoutes = [
    { name: "Notification", link: "/notification" },
    { name: "Settings", link: "/settings" },
  ];

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
  }, [lastScrollY, user]);

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
    window.localStorage.clear("accessToken");
  };

  if (loading || mongoUserLoading || signUpLoading) {
    return;
  }

  return (
    <nav
      className={`active ${show && "hidden"} ${
        user && mongoUser?.type === "admin" && "hidden"
      }`}
    >
      <div className="fixed top-0 w-[100%] z-50">
        <div className="nav-active px-4 py-1 lg:p-0">
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
                  className={`lg:flex w-100 h-72 lg:h-auto lg:w-full block lg:items-center navbar absolute duration-500 ease-in lg:static top-16 lg:bg-transparent bg-white overflow-hidden ${
                    open ? "left-[-10px] top-16" : "left-[-1080px]"
                  }`}
                >
                  {!user &&
                    unAuthorizedRoutes?.map((item) => (
                      <li key={item.name} className="block text-center">
                        <NavLink to={item.link}>{item.name}</NavLink>
                      </li>
                    ))}
                  {/* Routes for authenticated users [personal users only]  */}
                  {user &&
                    mongoUser?.type === "personal" &&
                    personalUserRoutes.map((item) => (
                      <li key={item.name} className="block text-center">
                        <NavLink to={item.link}>{item.name}</NavLink>
                      </li>
                    ))}
                  {user &&
                    mongoUser?.type === "merchant" &&
                    merchantUserRoutes.map((item) => (
                      <li key={item.name} className="block text-center">
                        <NavLink to={item.link}>{item.name}</NavLink>
                      </li>
                    ))}
                  {user &&
                    commonRoutes.map((item) => (
                      <>
                        {item.name === "Notification" ? (
                          <li
                            className={`block text-center relative`}
                            key={item.name}
                          >
                            <NavLink to={item.link}>{item.name}</NavLink>
                            <p
                              className={`notificationCounter ${
                                unseenNotifications?.length !== 0 &&
                                pathName !== "/notification" &&
                                "notificationCounterShow"
                              }`}
                            >
                              {unseenNotifications?.length}
                            </p>
                          </li>
                        ) : (
                          <li className={`block text-center`} key={item.name}>
                            <NavLink to={item.link}>{item.name}</NavLink>
                          </li>
                        )}
                      </>
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
                    <button
                      onClick={handleSignOut}
                      className="btn hover:bg-transparent border-2 hover:text-secondary border-secondary hover:border-secondary bg-secondary  text-white btn-sm lg:mx-4 hidden lg:block"
                    >
                      Sign Out
                    </button>
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
