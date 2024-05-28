import { React, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [donutData, setDonutData] = useState({
    salary: 0,
    utilities: 0,
    misc: 0,
    project: 0,
    snacks: 0,
  });
  const getExpenseData = async () => {
    const config = {
      url: "http://localhost:4000/expense/all",
      method: "get",
    };
    axios(config)
      .then((res) => {
        let data = {};
        res.data.map((item) => {
          data[item.expenseCategory]
            ? (data[item.expenseCategory] += item.expenseAmount)
            : (data[item.expenseCategory] = item.expenseAmount);
        });
        setDonutData(data);
      })
      .catch((e) => console.error(e));
  };

  const color = {
    salary: "rgba(255, 99, 132)",
    utilities: "rgba(54, 162, 235, 1)",
    misc: "rgba(255, 206, 86, 1)",
    snacks: "rgba(75, 192, 192, 1)",
    project: "rgba(153, 102, 255, 1)",
  };
  const labels = {
    salary: "Salary",
    utilities: "Utilities",
    misc: "Miscellaneous",
    snacks: "Snakcs",
    project: "Project Expenses",
  };

  const getDetails = (array) => {
    const res = [];
    Object.entries(donutData).map((key, value) => res.push(array[key[0]]));
    return res;
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  const data = {
    labels: getDetails(labels),
    datasets: [
      {
        data: Object.entries(donutData).map((key, value) => donutData[key[0]]),

        backgroundColor: getDetails(color),
        borderColor: getDetails(color),
      },
    ],
  };

  // console.log(donutData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
