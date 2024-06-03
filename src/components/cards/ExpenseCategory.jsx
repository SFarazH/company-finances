import { React, useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SetQuery from "../SetQuery";
import Spinner from "../Spinner";

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
  const [temp, setTemp] = useState(0);

  const getExpenses = async () => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/expense/get",
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
    <Spinner
      component={
        <>
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
          <SetQuery setQueryParams={setQueryParams} setTemp={setTemp} />
          <div className="">
            {expenseData &&
              expenseData.map((expense) => (
                <ExpenseCard key={expense._id} {...expense} />
              ))}
          </div>
        </>
      }
    />
  );
};

export default ExpenseCategory;
