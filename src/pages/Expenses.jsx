import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "../components/ExpenseCard";

export default function Expenses() {
  // cateory = salary , project expenses , snacks , bills , misc
  const category = {
    salary: "Salary",
    project: "Project Expenses",
    utilities: "Utilities Bill",
    snacks: "Snacks",
    misc: "Miscellaneous",
  };

  const [expenseCategory, setCategory] = useState("");
  const [expenseData, setExpenses] = useState(null);

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
      setExpenses(expenses.data);
      console.log(expenses.data.map((e) => e));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    expenseCategory && getExpenses();
  }, [expenseCategory]);

  return (
    <>
      <div className="px-8">
        <p className="text-2xl font-semibold my-4">Expenses</p>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(category).map(([key, value]) => (
            <div
              onClick={() => {
                setCategory(key);
              }}
              key={key}
              className="border p-3 rounded-lg border-gray-500 font-semibold text-white bg-indigo-950 hover:bg-indigo-900 cursor-pointer transition duration-200"
            >
              {value}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-12">
          {expenseData &&
            expenseData.map((expense) => (
              <ExpenseCard key={expense._id} {...expense} />
            ))}
        </div>
      </div>
    </>
  );
}
