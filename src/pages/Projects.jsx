import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProjectNames from "../components/cards/ProjectNames";
import ProjectCard from "../components/cards/ProjectCard";
import Spinner from "../components/Spinner";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import ProjectForm from "../components/forms/ProjectForm";
import SetQuery from "../components/SetQuery";

export default function Projects() {
  const navigate = useNavigate();
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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sortedArray = projects.sort((a, b) => {
    if (a.isClosed === b.isClosed) {
      return 0;
    }
    return a.isClosed ? 1 : -1;
  });

  useEffect(() => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/project/all",
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
                onClick={() => {
                  setIsForm(true);
                  navigate("/projects");
                }}
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
                    <SetQuery
                      setQueryParams={setQueryParams}
                      setTemp={setTemp}
                    />
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
