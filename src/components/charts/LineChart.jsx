import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = () => {
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
        temp[str] ? (temp[str] += 1) : (temp[str] = 1);
      }
    });

    return temp;
  };

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      axios
        .get("http://localhost:4000/project/all")
        .then((res) => setProjectsByMonth(getOrdersByMonth(res.data)))
        .catch((e) => console.error("Error fetching data:", e));
    };

    fetchData();
  }, []);

  console.log(projectsByMonth);

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
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            precision: 0,
          },
        },
      ],
    },
  };
  return (
    <div>
      <h2>Projects Received by Month</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
