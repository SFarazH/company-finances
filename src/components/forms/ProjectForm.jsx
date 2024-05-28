import React from "react";
import { useForm } from "react-hook-form";

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Project Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Project Type</label>
          <input
            {...register("projectType", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.projectType && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Name</label>
          <input
            {...register("projectName", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.projectName && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Consultant Name</label>
          <input
            {...register("projectConsultant.name", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.projectConsultant?.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Consultant Fees</label>
          <input
            {...register("projectConsultant.fees", { required: true })}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.projectConsultant?.fees && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project Manager</label>
          <input
            {...register("projectManager", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.TDS && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
