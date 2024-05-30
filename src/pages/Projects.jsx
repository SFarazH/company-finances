import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import ProjectNames from "../components/ProjectNames";
import ProjectCard from "../components/ProjectCard";
import Spinner from "../components/Spinner";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import ProjectForm from "../components/forms/ProjectForm";

export default function Projects() {
  const [isForm, setIsForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [temp, setTemp] = useState(0);
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
  });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setQueryParams({ ...queryParams, [name]: newValue });
  };
  const sortedArray = projects.sort((a, b) => {
    if (a.isClosed === b.isClosed) {
      return 0;
    }
    return a.isClosed ? 1 : -1;
  });

  useEffect(() => {
    const config = {
      url: "http://localhost:4000/project/all",
      method: "get",
      params: { ...queryParams },
    };
    axios(config)
      .then((res) => setProjects(res.data))
      .catch((e) => console.error(e));
  }, [temp]);

  return (
    <>
      {showLoader ? (
        <Spinner />
      ) : (
        <div className="px-8">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold my-4 mb-6">Projects</p>
            {isForm ? (
              <IoIosCloseCircle
                color="red"
                size={45}
                className="cursor-pointer"
                onClick={() => setIsForm(false)}
              />
            ) : (
              <IoIosAddCircle
                size={45}
                color="#003262"
                className="cursor-pointer"
                onClick={() => setIsForm(true)}
              />
            )}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                isForm ? (
                  <ProjectForm setTemp={setTemp} setIsForm={setIsForm} />
                ) : (
                  <>
                    <div>
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

                        <button type="submit" className="">
                          <FaCheck className="p-2" color="green" size="2.5em" />
                        </button>
                        <button
                          onClick={() =>
                            setQueryParams({ fromDate: "", toDate: "" })
                          }
                          className="p-2 rounded-lg bg-red-600 text-white"
                        >
                          Clear
                        </button>
                      </form>
                    </div>
                    <div>
                      {sortedArray.map((project) => (
                        <Link key={project._id} to={`/projects/${project._id}`}>
                          <ProjectNames {...project} />
                        </Link>
                      ))}
                    </div>
                  </>
                )
              }
            />
            <Route path=":projectId" element={<ProjectCard />} />
          </Routes>
        </div>
      )}
    </>
  );
}
