import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const ExpenseForm = ({ setIsForm }) => {
  const [projectNames, setProjectNames] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [employees, setEmployees] = useState([]);

  const getEmployeeNames = async () => {
    const config = {
      url: "http://localhost:4000/employee/get",
      method: "get",
    };
    axios(config)
      .then((res) => setEmployees(res.data))
      .catch((e) => console.error(e));
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    data.expenseAmount = parseFloat(data.expenseAmount);
    addExpense(data);
    console.log(data);
  };

  const getProjectsName = async () => {
    const config = {
      url: "http://localhost:4000/purchase/all",
      method: "get",
    };
    axios(config)
      .then((res) => setProjectNames(res.data))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProjectsName();
    getEmployeeNames();
  }, []);

  useEffect(() => {
    if (watch("expenseCategory") !== "project") {
      setValue("projectPurchaseId", null);
    }
  }, [watch("expenseCategory"), setValue]);

  const addExpense = async (data) => {
    const config = {
      url: "http://localhost:4000/expense/add",
      method: "post",
      data: data,
    };
    axios(config)
      .then((res) => {
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setIsForm(false);
        }, 1500);
      })
      .catch((e) => {
        setErrorMsg(e.response.data.error);
        setError(true);
      });
  };

  const expenseCategories = [
    { name: "Project Purchase", value: "project", id: 1 },
    { name: "Salary", value: "salary", id: 2 },
    { name: "Utilities", value: "utilities", id: 3 },
    { name: "Snacks", value: "snacks", id: 4 },
    { name: "Miscellaneous", value: "misc", id: 5 },
  ];

  const getLiability = (id) => {
    const projectL = projectNames.find((p) => p._id === id);
    return projectL ? projectL.paymentLiability : null;
  };

  return (
    <>
      <div className="max-w-xl mx-auto mb-8 pb-4 shadow-md rounded-md p-4">
        <p className="text-center text-xl font-semibold mb-4">Add Expense</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Expense Category
            </label>
            <select
              {...register("expenseCategory", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            >
              <option value="">Select a category</option>
              {expenseCategories.map((expense) => (
                <option key={expense.id} value={expense.value}>
                  {expense.name}
                </option>
              ))}
            </select>
            {errors.expenseCategory && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {watch("expenseCategory") === "project" && (
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Product Name
              </label>
              <select
                {...register("projectPurchaseId", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
              >
                <option value="">Select Product</option>
                {projectNames.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.productName}
                  </option>
                ))}
              </select>
              {errors.projectPurchaseId && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          )}

          {watch("expenseCategory") === "salary" && (
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Employee Name
              </label>
              <select
                {...register("empId", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
              {errors.projectPurchaseId && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Expense Amount
            </label>
            <input
              {...register("expenseAmount", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.expenseAmount && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {watch("projectPurchaseId") && (
            <div className="mb-4">
              <p className="text-lg font-semibold text-center">
                Project Liability :{" "}
                <span className="text-red-500">
                  {getLiability(watch("projectPurchaseId"))}
                </span>
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Expense Date
            </label>
            <input
              {...register("expenseDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.expenseDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Point of Contact
            </label>
            <input
              placeholder="Name"
              {...register("expensePOC.name", { required: false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.expensePOC?.name && (
              <span className="text-red-600">This field is required</span>
            )}
            <input
              {...register("expensePOC.mobile", { required: false })}
              type="number"
              placeholder="Number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.expensePOC?.mobile && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Bill ID
            </label>
            <input
              placeholder="Bill ID"
              {...register("billId", { required: false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.billId && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Expense Comments
            </label>
            <textarea
              {...register("expenseComments", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.expenseComments && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          {success && (
            <p className="text-green-500 font-semibold text-center pb-4">
              Expense added successfully!
            </p>
          )}

          {error && (
            <p className="text-red-500 font-semibold text-center pb-4">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-fit flex mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
