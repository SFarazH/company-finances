import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const SetQuery = ({ setQueryParams, setTemp, isProject }) => {
  const [queryParams, setQuery] = useState({
    fromDate: "",
    toDate: "",
    projectId: "",
  });
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
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setQuery({ ...queryParams, [name]: newValue });
  };
  useEffect(() => {
    getNames();
  }, []);
  return (
    <>
      <form
        className="flex justify-between items-center gap-4 p-4 mb-10 bg-gray-100 rounded-lg "
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams(queryParams);
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
          <label htmlFor="toDate" className="text-sm font-medium text-gray-700">
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

        {isProject && (
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
        )}

        <button type="submit" className="">
          <FaCheck className="p-2" color="green" size="2.5em" />
        </button>
        <button
          onClick={() => setQuery({ fromDate: "", toDate: "", projectId: "" })}
          className="p-2 rounded-lg bg-red-600 text-white"
        >
          Clear
        </button>
      </form>
    </>
  );
};

export default SetQuery;
