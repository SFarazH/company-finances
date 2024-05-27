import { React, useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseCategory = () => {
  const category = {
    salary: "Salary",
    project: "Project Expenses",
    utilities: "Utilities Bill",
    snacks: "Snacks",
    misc: "Miscellaneous",
  };
  const navigate = useNavigate();
  const [expenseData, setExpenses] = useState(null);
  const { expenseCategory } = useParams();

  const getExpenses = async () => {
    const config = {
      url: "http://localhost:4000/expense/get",
      method: "get",
      params: {
        expenseCategory: expenseCategory,
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
  }, [expenseCategory]);
  return (
    <div>
      <div className="flex gap-4 items-center">
        <IoArrowBackCircle
          size={40}
          color="green"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="text-2xl font-semibold my-4">{category[expenseCategory]}</p>
      </div>
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
