import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../assets/main_logo.png";
import sideMenu from "../assets/sidebar.json";

export default function SideMenu() {
  return (
    <>
      <Sidebar backgroundColor="#003262" className="h-screen">
        <img src={logo} alt="" className="mx-auto my-4" />
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: "skyblue",
                color:"black",
                borderRadius:"10px"
              },
            },
          }}
          className="mt-[80px]"
        >
          {sideMenu.map((item) => (
            <MenuItem id={item.id} className="text-md font-bold text-white px-2">
              {item.heading}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
}
