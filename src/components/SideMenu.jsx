import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../assets/main_logo.png";
import sideMenu from "../assets/sidebar.json";
import { Link } from "react-router-dom";

export default function SideMenu() {
  // const menuItemStyles={{

  //     "&:hover": {
  //       backgroundColor:"skyblue",
  //       color: "black",
  //       borderRadius: "10px",
  //     },

  // }}
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
      {/*
        
        <Menu
          
          className="mt-[80px]"
        >
          {sideMenu.map((item) => (
            <Link to={item.link}>
              <MenuItem
                id={item.id}
                className="text-md font-bold text-white px-2"
              >
                {item.heading}
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Sidebar> */}
    </>
  );
}
