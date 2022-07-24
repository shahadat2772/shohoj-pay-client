import React, { useState } from "react";
import "./Navbar.css";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import logo from "../../../logos/logo-horizontal.png";

const Navbar = () => {
  // NAV OPACITY CHANGER
  // const navbar = document.querySelector(".navbarContainer");
  // window.onscroll = () => {
  //   if (window.scrollY > 20) {
  //     navbar.classList.add("nav-active");
  //   } else {
  //     navbar.classList.remove("nav-active");
  //   }
  // };
  // ALL ROUTE
  const link = [
    { id: 1, name: "Home", link: "/home" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Blogs", link: "/blogs" },
    { id: 4, name: "Contact", link: "/contact" },
    { id: 5, name: "Other", link: "/other" },
  ];
  // RESPONSIVE TOGGLER BTN STATE
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 w-[100%] z-50">
      <div className="nav-active px-4 py-2 lg:rounded-2xl lg:p-0 lg:m-4">
        <div className="p-1 lg:px-8 md:px-4">
          <nav className="flex items-center justify-between">
            {/* PROJECT LOGO */}
            <div>
              <a href="#">
                <img src={logo} className="w-40" alt="" />
                {/* {logo} */}
              </a>
            </div>
            <div className="ml-20">
              {" "}
              {/* NAV ITEM */}
              <ul
                className={`lg:flex w-100 h-72 lg:h-auto lg:w-full block lg:items-center navbar absolute duration-500 ease-in lg:static top-16 lg:bg-transparent bg-white overflow-hidden ${
                  open ? "left-[-10px] top-16" : "left-[-1080px]"
                }`}
              >
                {link.map((item) => (
                  <li className="block text-center " key={item.id}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
                {/* RESPONSIVE LOGIN OR SIGN UP  BUTTON */}
                <div className=" flex items-center justify-center lg:hidden">
                  <button className="btn bg-transparent border-2 text-secondary hover:border-secondary hover:bg-secondary border-secondary hover:text-white btn-sm mr-3">
                    Login
                  </button>
                  <button className=" btn bg-[#3F4AD9] hover:bg-primary border-0 btn-sm">
                    Sign Up
                  </button>
                </div>
                {/* LARGE DEVICE LOGIN OR SIGN UP BUTTON */}
                <button className="btn bg-transparent border-2 text-secondary hover:border-secondary hover:bg-secondary border-secondary hover:text-white btn-sm lg:mx-4 hidden lg:block">
                  Login
                </button>
                <button className="btn bg-primary hover:bg-[#1d27af] text-white border-0 btn-sm hidden lg:block">
                  Sign Up
                </button>
              </ul>
            </div>
            {/* NAVBAR TOGGLER ICON */}
            <div onClick={() => setOpen(!open)} className="w-10 h-10 lg:hidden">
              {open ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
