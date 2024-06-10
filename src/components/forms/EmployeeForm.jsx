import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EmployeeForm = ({ setTemp, setIsForm }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const addEmployee = async (data) => {
    const config = {
      url: "http://localhost:4000/employee/add",
      method: "post",
      data: data,
    };
    axios(config)
      .then((res) => {
        // console.log(res);
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          setIsForm(false);
          setTemp((prev) => prev + 1);
        }, 1500);
      })
      .catch((e) => {
        setErrorMsg(e.response.data.error);
        setError(true);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // data.aadhar = parseFloat(data.aadhar);
    addEmployee(data);
    console.log(data);
  };
  return (
    <>
      <div className="max-w-xl mx-auto mb-8 pb-4 shadow-md rounded-md p-4">
        <p className="text-center text-xl font-semibold mb-4">Add Employee</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Mobile
            </label>
            <input
              {...register("mobile", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.mobile && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              AADHAR Number
            </label>
            <input
              {...register("aadhar", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.aadhar && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              PAN Number
            </label>
            <input
              {...register("pan", { required: false })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {/* {errors.pan && (
              <span className="text-red-600">This field is required</span>
            )} */}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Joining Date
            </label>
            <input
              {...register("joiningDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.joiningDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Job Role
            </label>
            <input
              {...register("jobRole", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.jobRole && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {success && (
            <p className="text-green-500 font-semibold text-center pb-4">
              Employee added successfully!
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

export default EmployeeForm;
