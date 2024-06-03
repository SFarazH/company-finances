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
      url: "https://obb-finance-backend-1.onrender.com/project/names",
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
      url: "https://obb-finance-backend-1.onrender.com/purchase/add",
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
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Purchase Form</h2>
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
            <label className="block text-gray-700">Product Name</label>
            <input
              {...register("productName", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.productName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Vendor Name</label>
            <input
              {...register("vendorName", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.vendorName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Price</label>
            <input
              {...register("finalPriceProduct", { required: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.finalPriceProduct && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Purchase Date</label>
            <input
              {...register("purchaseDate", { required: true })}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PurchaseForm;
