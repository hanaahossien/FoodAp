import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";

export default function MasteraLayout({loginData}) {
  return (
    <div className="container-fluid ">
      <div className="row ">
      <div className=" d-flex bg-white">

        <div className="h-100 bg-darkgray" >
          <SideBar/>
        </div>
          <div className="w-100 px-3">
            <Navbar loginData={loginData} />

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
