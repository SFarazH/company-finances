import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ setIsForm }) => {
  const [projectNames, setProjectNames] = useState([]);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addExpense(data);
  };

  const getProjectsName = async () => {
    const config = {
      url: "http://localhost:4000/project/names",
      method: "get",
    };
    axios(config)
      .then((res) => setProjectNames(res.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getProjectsName();
  }, []);

  const addExpense = async (data) => {
    const config = {
      url: "http://localhost:4000/expense/add",
      method: "post",
      data: data,
    };
    axios(config)
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          setIsForm(false);
        }, 1500);
      })
      .catch((e) => console.error(e));
  };

  const expenseCategories = [
    { name: "Project", value: "project", id: 1 },
    { name: "Salary", value: "salary", id: 2 },
    { name: "Utilities", value: "utilities", id: 3 },
    { name: "Snacks", value: "snacks", id: 4 },
    { name: "Miscellaneous", value: "misc", id: 5 },
  ];

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Project Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Expense Category</label>
            <select
              {...register("expenseCategory", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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

          {watch("expenseCategory") === "project" ? (
            <div className="mt-4">
              <label className="block text-gray-700">Project Name</label>
              <select
                {...register("projectPurchaseId", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a company</option>
                {projectNames.map((project) => (
                  <option value={project._id}>{project.projectName}</option>
                ))}
              </select>
              {errors.projectPurchaseId && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          ) : (
            setValue("projectPurchaseId", null)
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Expense Amount</label>
            <input
              {...register("expenseAmount", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expenseAmount && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Expense Date</label>
            <input
              {...register("expenseDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expenseDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Point of Contact</label>
            <input
              placeholder="Name"
              {...register("expensePOC.name", { required: false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expensePOC?.name && (
              <span className="text-red-600">This field is required</span>
            )}
            <input
              {...register("expensePOC.mobile", { required: false })}
              type="number"
              placeholder="Number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expensePOC?.mobile && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bill ID</label>
            <input
              placeholder="Name"
              {...register("billId", { required: false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.billId && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Expense Comments</label>
            <textarea
              {...register("expenseComments", { required: true })}
              type="text-area"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expenseComments && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          {success && (
            <p className="text-green-500 font-semibold font-lg text-center pb-4">
              Expense added successfully!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
