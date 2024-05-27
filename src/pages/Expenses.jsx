import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Routes, Route, Link } from "react-router-dom";
import ExpenseCategory from "../components/ExpenseCategory";

export default function Expenses() {
  // cateory = salary , project expenses , snacks , bills , misc
  const category = {
    salary: "Salary",
    project: "Project Expenses",
    utilities: "Utilities Bill",
    snacks: "Snacks",
    misc: "Miscellaneous",
  };
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? (
        <Spinner />
      ) : (
        <div className="px-8">
          <p className="text-3xl font-semibold my-4">Expenses</p>
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-5 gap-4">
                  {Object.entries(category).map(([key, value]) => (
                    <Link to={`/expenses/${key}`}>
                      <div
                        key={key}
                        className="p-3 rounded-lg border-gray-500 font-semibold text-white bg-indigo-950 hover:bg-indigo-900 cursor-pointer transition duration-200"
                      >
                        {value}
                      </div>
                    </Link>
                  ))}
                </div>
              }
            ></Route>
            <Route
              path=":expenseCategory"
              element={
                <div className="">
                  <ExpenseCategory />
                </div>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}
