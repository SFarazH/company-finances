import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import ProjectNames from "../components/ProjectNames";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [query, isQuery] = useState(0);
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setQueryParams({ ...queryParams, [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isQuery((prev) => prev + 1);
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
  }, [query]);

  return (
    <div className="px-8">
      <p className="text-3xl font-semibold my-4">Projects</p>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {" "}
              
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-4 justify-between">
                    <div className="mb-4 w-3/12">
                      <label className="block text-sm font-medium text-gray-700">
                        From Date
                      </label>
                      <input
                        type="date"
                        name="fromDate"
                        value={queryParams.fromDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4 w-3/12">
                      <label className="block text-sm font-medium text-gray-700">
                        To Date
                      </label>
                      <input
                        type="date"
                        name="toDate"
                        value={queryParams.toDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="flex items-center w-2/12">
                      <button type="submit" className="w-1/2">
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
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {sortedArray.map((project) => (
                  <Link key={project._id} to={`/projects/${project._id}`}>
                    <ProjectNames {...project} />
                  </Link>
                ))}
              </div>
            </div>
          }
        />
        <Route path=":projectId" element={<ProjectCard />} />
      </Routes>
    </div>
  );
}
