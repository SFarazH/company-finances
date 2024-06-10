import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { IoArrowBackCircle } from "react-icons/io5";
import { formatDate } from "../functions";

const EmployeeCard = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const getEmployeeData = async (id) => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/employee/get`,
      method: "get",
      params: {
        empId: id,
      },
    };
    axios(config)
      .then((res) => setEmpData(res.data))
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    getEmployeeData(empId);
  }, []);
  return (
    <Spinner
      component={
        <>
          <div className="mt-2">
            <IoArrowBackCircle
              size={35}
              color="green"
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <div className="border rounded-lg p-2 mt-2">
              <p className="text-xl font-semibold">{empData.name}</p>
              <div className="flex justify-between mt-3">
                <div className="grid grid-cols gap-y-2">
                  <p className="text-md">
                    AADHAR :{" "}
                    <span className="font-semibold">{empData.aadharCard}</span>
                  </p>
                  {empData.panCard && (
                    <p className="text-md">
                      PAN :{" "}
                      <span className="font-semibold">{empData.panCard}</span>
                    </p>
                  )}
                  <p className="text-md">
                    Joining Date :{" "}
                    <span className="font-semibold text-blue-800">
                      {formatDate(empData.joiningDate)}
                    </span>
                  </p>
                  <p className="text-md">
                    Job Role :{" "}
                    <span className="font-semibold text-lg text-blue-800">
                      {empData.jobRole}
                    </span>
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg w-1/3 p-2">
                  <p className="font-semibold text-md mb-3">Salaries</p>
                  {empData.salaries?.map((salary) => {
                    return (
                      <div className="flex justify-between items-center my-1">
                        <p>{formatDate(salary.date)}</p>
                        <p>{salary.amount}</p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p className="text-md font-semibold mb-2">
                    Contact Details :{" "}
                  </p>
                  <p className="text-md">{empData.mobile}</p>
                  <p className="text-md">{empData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default EmployeeCard;
