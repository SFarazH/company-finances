import React from "react";
// import logo from "../assets/main_logo.png";
import sideMenu from "../assets/sidebar.json";
import { Link, useLocation } from "react-router-dom";

export default function SideMenu() {
  const loc = useLocation();

  return (
    <>
      <div className="h-screen sticky top-0 bg-[#003262]">
        <p className="mx-4 p-4 italic text-white font-semibold text-2xl">XYZ Technologies</p>
        <div className="grid grid-flow-row gap-4 mt-4">
          {sideMenu.map((item) => {
            const isActive = loc.pathname === item.link;
            return (
              <Link key={item.id} to={item.link}>
                <p
                  key={item.id}
                  className={`mx-4 p-4 px-8 text-lg font-semibold hover:cursor-pointer hover:bg-[#87CEFA] rounded-full hover:text-black ${
                    isActive ? "bg-[#87CEFA] text-black" : "text-white"
                  }`}
                >
                  {item.heading}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
