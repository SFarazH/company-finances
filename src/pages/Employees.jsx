import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import EmployeeCard from "../components/cards/EmployeeCard";
import Spinner from "../components/Spinner";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import EmployeeForm from "../components/forms/EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [temp, setTemp] = useState(0);
  const getEmployeeNames = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/employee/get`,
      method: "get",
    };
    axios(config)
      .then((res) => setEmployees(res.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getEmployeeNames();
  }, [temp]);

  return (
    <Spinner
      component={
        <>
          <div className="px-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-3xl font-semibold my-4">Employees</p>
              {isForm ? (
                <IoCloseCircle
                  onClick={() => setIsForm(false)}
                  size={40}
                  color="red"
                  className="cursor-pointer"
                />
              ) : (
                <IoAddCircle
                  onClick={() => {
                    setIsForm(true);
                  }}
                  size={40}
                  color="green"
                  className="cursor-pointer"
                />
              )}
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  isForm ? (
                    <EmployeeForm setIsForm={setIsForm} setTemp={setTemp} />
                  ) : (
                    <>
                      {employees.map((emp) => (
                        <Link to={`/employees/${emp._id}`}>
                          <div
                            key={emp._id}
                            className="text-xl text-semibold border p-2 rounded-lg my-2"
                          >
                            <p>{emp.name}</p>
                          </div>
                        </Link>
                      ))}
                    </>
                  )
                }
              ></Route>
              <Route path=":empId" element={<EmployeeCard />}></Route>
            </Routes>
          </div>
        </>
      }
    />
  );
};

export default Employees;
