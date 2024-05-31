import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PaymentForm = ({ setIsForm }) => {
  const [projectNames, setProjectNames] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addPayment(data);
  };

  const getProjectsName = async () => {
    const config = {
      url: "http://localhost:4000/project/names",
      method: "get",
      params: {
        liability: true,
      },
    };
    axios(config)
      .then((res) => {
        setProjectNames(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getProjectsName();
  }, []);

  const addPayment = async (data) => {
    const config = {
      url: "http://localhost:4000/payment/add",
      method: "post",
      data: data,
    };
    axios(config)
      .then((res) => {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          setIsForm(false);
        }, 1500);
      })
      .catch((e) => {
        setErrorMsg(e.response.data.error);
        setError(true);
      });
  };

  const getLiability = (id) => {
    const projectL = projectNames.find((p) => p._id === id);
    return projectL.projectLiability;
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Payment Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-gray-700">Project Name</label>
            <select
              {...register("projectId", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a project</option>
              {projectNames.map((project) => (
                <option value={project._id}>{project.projectName}</option>
              ))}
            </select>
            {errors.projectId && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            {watch("projectId") && (
              <p className="text-lg font-semibold text-center">
                Project Liability :{" "}
                <span className="text-red-500">
                  {getLiability(watch("projectId"))}
                </span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Amount</label>
            <input
              {...register("amount", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.amount && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Date</label>
            <input
              {...register("paymentDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.paymentDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {success && (
            <p className="text-green-500 font-semibold font-lg text-center pb-4">
              Payment added successfully!
            </p>
          )}

          {error && (
            <p className="text-red-500 font-semibold font-lg text-center pb-4">
              {errorMsg}!
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

export default PaymentForm;
