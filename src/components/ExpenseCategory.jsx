import { React, useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseCategory = () => {
  const category = {
    salary: "Salary",
    project: "Project Expenses",
    utilities: "Utilities Bill",
    snacks: "Snacks",
    misc: "Miscellaneous",
  };
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
  });
  const navigate = useNavigate();
  const [expenseData, setExpenses] = useState(null);
  const { expenseCategory } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryParams({
      ...queryParams,
      [name]: value,
    });
  };
  const [temp, setTemp] = useState(0);

  const getExpenses = async () => {
    const config = {
      url: "http://localhost:4000/expense/get",
      method: "get",
      params: {
        expenseCategory: expenseCategory,
        ...queryParams,
      },
    };
    try {
      const expenses = await axios(config);
      console.log(expenses);
      setExpenses(expenses.data);
      console.log(expenses.data.map((e) => e));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getExpenses();
  }, [expenseCategory, temp]);
  return (
    <div>
      <div className="flex gap-4 items-center">
        <IoArrowBackCircle
          size={40}
          color="green"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="text-2xl font-semibold my-4">
          {category[expenseCategory]}
        </p>
      </div>
      <form
        className="flex justify-between items-center gap-4 p-4 bg-gray-100 rounded-lg "
        onSubmit={(e) => {
          e.preventDefault();
          console.log(queryParams);
          setTemp((prev) => prev + 1);
        }}
      >
        <div className="flex flex-col w-1/5">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium text-gray-700"
          >
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={queryParams.fromDate}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col w-1/5">
          <label htmlFor="toDate" className="text-sm font-medium text-gray-700">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            onChange={handleChange}
            value={queryParams.toDate}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="">
          <FaCheck className="p-2" color="green" size="2.5em" />
        </button>
        <button
          onClick={() => setQueryParams({ fromDate: "", toDate: "" })}
          className="p-2 rounded-lg bg-red-600 text-white"
        >
          Clear
        </button>
      </form>
      <div className="">
        {expenseData &&
          expenseData.map((expense) => (
            <ExpenseCard key={expense._id} {...expense} />
          ))}
      </div>
    </div>
  );
};

export default ExpenseCategory;
