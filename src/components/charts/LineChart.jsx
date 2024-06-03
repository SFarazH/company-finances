import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ year }) => {
  const [expenses, setExpenses] = useState({});
  const [payments, setPayments] = useState({});

  const sortPaymentsByMonth = (array) => {
    const temp = {};
    const currentYear = new Date().getFullYear();

    array.map((project) => {
      const date = new Date(project.paymentDate);
      const year = date.getFullYear();

      if (year === currentYear) {
        const month = date.toLocaleString("default", { month: "short" });
        const str = month + year.toString().slice(2);
        temp[month]
          ? (temp[month] += project.receivedAmount)
          : (temp[month] = project.receivedAmount);
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

  const sortExpensessByMonth = (array) => {
    const temp = {};
    const currentYear = new Date().getFullYear();

    array.map((project) => {
      const date = new Date(project.expenseDate);
      const year = date.getFullYear();

      if (year === currentYear) {
        const month = date.toLocaleString("default", { month: "short" });
        const str = month + year.toString().slice(2);
        temp[month]
          ? (temp[month] += project.expenseAmount)
          : (temp[month] = project.expenseAmount);
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

  const getData = async () => {
    const url1 = "https://obb-finance-backend-1.onrender.com/payment/get";
    const url2 = "https://obb-finance-backend-1.onrender.com/expense/all";
    const config = {
      params: {
        year: year,
      },
    };
    axios
      .all([
        axios.get(url1, config).then((res) => {
          setPayments(sortPaymentsByMonth(res.data));
        }),
        axios
          .get(url2, config)
          .then((res) => setExpenses(sortExpensessByMonth(res.data))),
      ])
      //   .then((res) => {
      //     console.log(res);
      //   })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getData();
  }, [year]);

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

  const expenseData = months.map((month) => expenses[month] || 0);
  const paymentData = months.map((month) => payments[month] || 0);
  const data = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Payments",
        data: paymentData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {" "}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
