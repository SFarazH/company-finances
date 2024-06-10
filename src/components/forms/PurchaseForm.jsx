import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PurchaseForm = ({ setIsForm }) => {
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
    data.finalPriceProduct = parseFloat(data.finalPriceProduct);
    console.log(data);
    addProductPurchase(data);
  };

  const getProjectsName = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/project/names`,
      method: "get",
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

  const addProductPurchase = async (data) => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/purchase/add`,
      method: "post",
      data: data,
    };
    axios(config)
      .then((res) => {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          setIsForm(false);
        }, 2000);
        // console.log(res.data);
      })
      .catch((e) => {
        setErrorMsg(e.response.data.error);
        setError(true);
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto mb-8 pb-4 shadow-md rounded-md p-4">
        <p className="text-center text-xl font-semibold mb-4">Add Purchase</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-md font-medium text-gray-700">
              Project Name
            </label>
            <select
              {...register("projectId", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
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
            <label className="block text-md font-medium text-gray-700">
              Product Name
            </label>
            <input
              {...register("productName", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.productName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Vendor Name
            </label>
            <input
              {...register("vendorName", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.vendorName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Product Price
            </label>
            <input
              {...register("finalPriceProduct", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.finalPriceProduct && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              {...register("purchaseDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.purchaseDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {success && (
            <p className="text-green-500 font-semibold font-lg text-center pb-4">
              Project Purchase added successfully!
            </p>
          )}

          {error && (
            <p className="text-red-500 font-semibold font-lg text-center pb-4">
              {errorMsg}!
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

export default PurchaseForm;
