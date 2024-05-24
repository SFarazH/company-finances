import axios from "axios";
import React, { useState, useEffect } from "react";
import PaymentCard from "../components/PaymentCard";
import { FaCheck } from "react-icons/fa";

export default function Payments(props) {
  const [paymentData, setPayment] = useState(null);
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
    projectId: "",
  });
  const [temp, setTemp] = useState(0);
  const [projNames, setNames] = useState(null);

  const getNames = async () => {
    const config = {
      url: "http://localhost:4000/project/names",
      method: "get",
    };
    try {
      const names = await axios(config);
      setNames(names.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryParams({
      ...queryParams,
      [name]: value,
    });
  };

  const getPayments = async () => {
    const config = {
      url: "http://localhost:4000/payment/get",
      method: "get",
      params: queryParams,
    };

    try {
      const payments = await axios(config);
      setPayment(payments.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, [temp]);

  useEffect(() => {
    getNames();
  }, []);

  return (
    <>
      <div className="px-8">
        <p className="text-3xl font-semibold my-4">Payments</p>
        <form
          className="flex justify-between items-center gap-4 p-4 bg-gray-100 rounded-lg "
          onSubmit={(e) => {
            e.preventDefault();
            console.log(queryParams);
            setTemp((prev) => prev + 1);
          }}
        >
          <div className="flex flex-col w-1/5">
            <label
              htmlFor="fromDate"
              className="text-sm font-medium text-gray-700"
            >
              From Date
            </label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={queryParams.fromDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/5">
            <label
              htmlFor="toDate"
              className="text-sm font-medium text-gray-700"
            >
              To Date
            </label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              onChange={handleChange}
              value={queryParams.toDate}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/5">
            <label
              htmlFor="project"
              className="text-sm font-medium text-gray-700"
            >
              Project
            </label>
            <select
              id="project"
              name="projectId"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={queryParams.projectId}
            >
              <option value="">Select a project</option>
              {projNames &&
                projNames.map((name) => (
                  <option value={name._id}>{name.projectName}</option>
                ))}
            </select>
          </div>
          <button type="submit" className="">
            <FaCheck className="p-2" color="green" size="2.5em" />
          </button>
          <button
            onClick={() =>
              setQueryParams({ fromDate: "", toDate: "", projectId: "" })
            }
            className="p-2 rounded-lg bg-red-600 text-white"
          >
            Clear
          </button>
        </form>
        <div className="mt-8">
          {paymentData && paymentData.length > 0 ? (
            paymentData.map((payment) => <PaymentCard {...payment} />)
          ) : (
            <p className="text-lg text-red-500 font-semibold text-center mt-4">
              No payments found!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
