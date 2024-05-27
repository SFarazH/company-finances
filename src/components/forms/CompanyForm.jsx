import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import axios from "axios";

const CompanyForm = ({ setIsForm, setTemp }) => {
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
    const config = {
      url: "http://localhost:4000/client/add",
      method: "post",
      data: res,
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
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
    <div className="mt-4 w-3/4 mx-auto">
      <p className="text-lg font-semibold text-center">Add Client</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            {...register("companyName", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Address
          </label>
          <div className="mt-1 space-y-4">
            <input
              {...register("street", { required: true })}
              placeholder="Street"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                {...register("country", { required: true })}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                {...register("state", { required: true })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <input
                {...register("pincode", { required: true })}
                placeholder="Pincode"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company POC
          </label>
          <div className="mt-1 grid grid-cols-3 gap-4">
            <input
              {...register("pocName", { required: true })}
              placeholder="Name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <input
              {...register("pocNumber", { required: true })}
              placeholder="Number"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <input
              {...register("pocEmail", { required: true })}
              placeholder="Email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company GST Number
          </label>
          <input
            {...register("companyGSTNumber", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="mt-4 text-red-500 font-semibold">
            Please fill all the details!
          </p>
        )}
        <div>
          <button
            type="submit"
            className="mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
