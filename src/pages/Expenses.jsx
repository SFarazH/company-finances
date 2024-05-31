import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ExpenseCategory from "../components/cards/ExpenseCategory";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import ExpenseForm from "../components/forms/ExpenseForm";

export default function Expenses() {
  // cateory = salary , project expenses , snacks , bills , misc
  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();
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
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold my-4">Expenses</p>
            {isForm ? (
              <IoCloseCircle
                onClick={() => setIsForm(false)}
                size={40}
                color="red"
                className="cursor-pointer"
              />
            ) : (
              <IoAddCircle
                onClick={() => {
                  navigate("/expenses");
                  setIsForm(true);
                }}
                size={40}
                color="green"
                className="cursor-pointer"
              />
            )}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                isForm ? (
                  <>
                    <ExpenseForm setIsForm={setIsForm} />
                  </>
                ) : (
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
                )
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
