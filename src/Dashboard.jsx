import { React, useEffect, useState } from "react";
import axios from "axios";
import DonutChart from "./components/DonutChart";
import BarGraph from "./components/charts/BarChart";
import PieChart from "./components/charts/PieChart";
import LineChart from "./components/charts/LineChart";

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = [];
  for (let year = currentYear; year >= 2010; year--) {
    years.push(year);
  }
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    console.log(year);
  };

  return (
    <>
      <div className="px-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center">
          <p className="text-3xl text-center font-bold py-8">Dashboard</p>

          <select
            className="rounded-2xl h-fit text-lg p-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-300 overflow-y-auto"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 mb-8">
          <div className="w-1/2 bg-white  rounded-lg">
            <p className="text-xl p-2 font-semibold bg-indigo-900 text-white rounded-t-lg">
              Expenses
            </p>
            <div className="p-1 py-4">
              <DonutChart />
            </div>
          </div>
          <div className="w-full h-fit bg-white  rounded-lg">
            <div className="flex justify-between p-2 bg-indigo-900  rounded-t-lg">
              <p className="text-xl text-white font-semibold ">
                Projects Received
              </p>
            </div>
            <div className="p-1 py-4">
              <BarGraph year={selectedYear} />
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full bg-white  rounded-lg">
            <div className="flex justify-between p-2 bg-indigo-900  rounded-t-lg">
              <p className="text-xl text-white font-semibold ">
                Expense v Payments
              </p>
            </div>
            <div className="p-1 py-4">
              <LineChart year={selectedYear} />
            </div>
          </div>
          <div className="w-1/2 bg-white rounded-lg h-fit">
            <p className="text-xl p-2 font-semibold bg-indigo-900 text-white rounded-t-lg">
              Liabilities
            </p>
            <div className="p-1 py-4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
