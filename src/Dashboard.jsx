import { React, useEffect, useState } from "react";
import axios from "axios";
import DonutChart from "./components/DonutChart";
import LineChart from "./components/charts/LineChart";

const Dashboard = () => {
  return (
    <>
      <div className="px-8 bg-gray-100 min-h-screen">
        <p className="text-3xl text-center font-bold py-8">Dashboard</p>
        <div className="flex gap-5">
          <div className="w-5/12 bg-white  rounded-lg">
            <p className="text-xl p-2 font-semibold bg-indigo-900 text-white rounded-t-lg">
              Expenses
            </p>
            <div className="p-1 py-4">
              <DonutChart />
            </div>
          </div>
          <div className="w-full h-fit bg-white  rounded-lg">
            <p className="text-xl p-2 font-semibold bg-indigo-900 text-white rounded-t-lg">
              Projects Received (2024)
            </p>
            <div className="p-1 py-4">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
