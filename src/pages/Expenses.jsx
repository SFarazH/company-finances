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

  const proj = {
    _id: "664d901bfacb9c32369095fe",
    expenseCategory: "project",
    projectPurchaseId: "664d8c9f54f8eb79f7179dda",
    expenseAmount: 800,
    expenseDate: "2024-05-22T00:00:00.000Z",
    billId: "GTYQQ713VB",
    __v: 0,
  };

  useEffect(() => {
    expenseCategory && getExpenses();
  }, [expenseCategory]);
  return (
    <>
      <p className="text-2xl font-semibold my-4 ">Expenses</p>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(category).map(([key, value]) => (
          <div
            onClick={() => {
              setCategory(key);
            }}
            key={key}
            className="border p-3 rounded-lg  border-gray-500"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-12 ">
      {expenseData &&
        expenseData.map((expense) => (
          <ExpenseCard key={expense._id} {...expense} />
        ))}
      </div>
    </>
  );
}
