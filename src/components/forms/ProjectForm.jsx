import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProjectForm = ({ setTemp, setIsForm }) => {
  const [companyNames, setCompanyNames] = useState([]);
  const [success, setSuccess] = useState(false);
  const getCompanyNames = async () => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/client/get",
      method: "get",
      params: {
        onlyNames: true,
      },
    };
    axios(config)
      .then((res) => setCompanyNames(res.data))
      .catch((e) => console.error(e));
  };

  const addProject = async (formData) => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/project/add",
      method: "post",
      data: formData,
    };
    axios(config).then((res) => {
      setSuccess(true);
      setTimeout(() => {
        setTemp((prev) => prev + 1);
        setIsForm(false);
      }, 1500);
    });
  };

  useEffect(() => {
    getCompanyNames();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TDS: 0,
      GSTPercent: 18,
    },
  });

  const onSubmit = (data) => {
    // Convert relevant fields to numbers
    const convertedData = {
      ...data,
      projectConsultant: {
        ...data.projectConsultant,
        price: parseFloat(data.projectConsultant?.price || 0),
      },
      finalPrice: parseFloat(data.finalPrice),
      GSTPercent: parseFloat(data.GSTPercent),
      TDS: parseFloat(data.TDS),
    };

    console.log(convertedData);
    addProject(convertedData);
  };

  return (
    <div className="max-w-xl mx-auto mb-8 pb-4 shadow-md rounded-md p-4">
      <p className="text-center text-xl font-semibold mb-4">Add Project</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div key={1} className="mb-4">
          <label className="block text-gray-700">Company</label>
          <select
            {...register("clientId", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          >
            <option value="">Select a company</option>
            {companyNames.map((companyName) => (
              <option value={companyName._id}>{companyName.companyName}</option>
            ))}
          </select>
          {errors.clientId && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Type</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                {...register("projectType", { required: true })}
                type="radio"
                value="software"
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">Software</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                {...register("projectType", { required: true })}
                type="radio"
                value="hardware"
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">Hardware</span>
            </label>
          </div>
          {errors.projectType && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Name</label>
          <input
            {...register("projectName", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.projectName && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Consultant Name</label>
          <input
            {...register("projectConsultant.name", { required: false })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.projectConsultant?.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Consultant Fees</label>
          <input
            {...register("projectConsultant.price", {
              // required: false,
              min: 0,
            })}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.projectConsultant?.price && (
            <span className="text-red-600">Please enter valid value!</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Manager</label>
          <input
            {...register("projectManager", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.projectManager && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date Received</label>
          <input
            {...register("dateReceived", { required: true })}
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.dateReceived && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Delivery Date</label>
          <input
            {...register("deliveryDate", { required: true })}
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.deliveryDate && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Final Price</label>
          <input
            {...register("finalPrice", { required: true })}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.finalPrice && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">GST Percent</label>
          <input
            {...register("GSTPercent", { required: true })}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.GSTPercent && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">TDS</label>
          <input
            {...register("TDS", { required: true })}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.TDS && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        {success && (
          <p className="text-green-500 font-semibold font-lg text-center pb-4">
            Project added successfully!
          </p>
        )}

        <button
          type="submit"
          className="w-fit flex mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
