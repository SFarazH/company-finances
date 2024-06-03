import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const BarGraph = ({ year }) => {
  const [projectsByMonth, setProjectsByMonth] = useState(null);

  const getOrdersByMonth = (projects) => {
    const temp = {};
    const currentYear = new Date().getFullYear();

    projects.map((project) => {
      const date = new Date(project.dateReceived);
      const year = date.getFullYear();

      if (year === currentYear) {
        const month = date.toLocaleString("default", { month: "short" });
        const str = month + year.toString().slice(2);
        temp[month] ? (temp[month] += 1) : (temp[month] = 1);
      }
    });
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    months.forEach((month) => {
      if (!temp[month]) {
        temp[month] = 0;
      }
    });

    const sortedTemp = {};
    months.forEach((month) => {
      sortedTemp[month] = temp[month];
    });

    return sortedTemp;
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        params: {
          year: year,
        },
      };
      axios
        .get("https://obb-finance-backend-1.onrender.com/project/all", config)
        .then((res) => setProjectsByMonth(getOrdersByMonth(res.data)))
        .catch((e) => console.error("Error fetching data:", e));
    };

    fetchData();
  }, [year]);

  //   projectsByMonth &&
  let monthNames = projectsByMonth && Object.keys(projectsByMonth);
  let counts = projectsByMonth && Object.values(projectsByMonth);

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Projects Received",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: counts,
      },
    ],
  };

  // Define options for the chart
  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
        },
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
