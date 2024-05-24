import React from "react";
import logo from "../assets/main_logo.png";
import sideMenu from "../assets/sidebar.json";
import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <>
      <div className="h-screen sticky top-0 bg-[#003262]">
        <img src={logo} alt="" className="mx-auto py-4" />
        <div className="grid grid-flow-row gap-4 mt-4">
          {sideMenu.map((item) => (
            <Link to={item.link}>
              <p
                key={item.id}
                className="text-white mx-4 p-4 px-8 text-lg font-semibold hover:cursor-pointer hover:bg-[#87CEFA] rounded-full hover:text-black"
              >
                {item.heading}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
