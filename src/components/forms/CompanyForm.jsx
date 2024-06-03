import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import axios from "axios";

const CompanyForm = ({ setIsForm, setTemp }) => {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const companyAddress = {
      street: data.street,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
    };
    const companyPOC = {
      name: data.pocName,
      number: data.pocNumber,
      email: data.pocEmail,
    };
    const res = {
      companyName: data.companyName,
      companyAddress: companyAddress,
      companyPOC: companyPOC,
      companyGSTN: data.companyGSTNumber,
    };
    console.log(res);
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/client/add",
      method: "post",
      data: res,
    };
    axios(config)
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          setIsForm(false);
          setTemp((t) => t + 1);
        }, 1500);
      })
      .catch((e) => console.error(e));
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];

  return (
    <div className="max-w-xl mx-auto mb-8 pb-4 shadow-md rounded-md p-4">
      <p className="text-center text-xl font-semibold mb-4">Add Company</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-gray-700">
            Company Name
          </label>
          <input
            {...register("companyName", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.companyName && (
            <span className="text-red-500 text-sm">
              Company Name is required
            </span>
          )}
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">
            Company Address
          </label>
          <div className="mt-1 space-y-4">
            <input
              {...register("street", { required: true })}
              placeholder="Street"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.street && (
              <span className="text-red-500 text-sm">Street is required</span>
            )}
            <input
              {...register("city", { required: true })}
              placeholder="City"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">City is required</span>
            )}
            <select
              {...register("country", { required: true })}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-red-500 text-sm">Country is required</span>
            )}
            <select
              {...register("state", { required: true })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-500 text-sm">State is required</span>
            )}
            <input
              {...register("pincode", { required: true })}
              placeholder="Pincode"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.pincode && (
              <span className="text-red-500 text-sm">Pincode is required</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">
            Company POC
          </label>
          <div className="mt-1 space-y-4">
            <input
              {...register("pocName", { required: true })}
              placeholder="Name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.pocName && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
            <input
              {...register("pocNumber", { required: true })}
              placeholder="Number"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.pocNumber && (
              <span className="text-red-500 text-sm">Number is required</span>
            )}
            <input
              {...register("pocEmail", { required: true })}
              placeholder="Email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            />
            {errors.pocEmail && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">
            Company GST Number
          </label>
          <input
            {...register("companyGSTNumber", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
          {errors.companyGSTNumber && (
            <span className="text-red-500 text-sm">
              Company GST Number is required
            </span>
          )}
        </div>
        {success && (
          <p className="text-green-500 font-semibold font-lg text-center">
            Company added successfully!
          </p>
        )}
        <div>
          <button
            type="submit"
            className="w-fit flex mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
