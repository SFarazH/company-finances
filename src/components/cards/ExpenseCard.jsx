import axios from "axios";
import React, { useState, useEffect } from "react";
import { PiMicrophoneSlash } from "react-icons/pi";
import { formatDate } from "../functions";

export default function ExpenseCard(props) {
  const [projectDetails, setProjectData] = useState(null);
  const [empData, setEmpData] = useState(null);

  const getProjDetails = async () => {
    const config = {
      url: "http://localhost:4000/purchase/id",
      method: "get",
      params: {
        projectPurchaseId: props.projectPurchaseId,
      },
    };
    try {
      const proj = await axios(config);
      setProjectData(proj.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployeeNames = async () => {
    const config = {
      url: "http://localhost:4000/employee/get",
      method: "get",
    };
    axios(config)
      .then((res) => setEmpData(res.data))
      .catch((e) => console.error(e));
  };
  const getEmployeeNameById = (id) => {
    const employee = empData.find((emp) => emp._id === id);
    return employee ? employee.name : null;
  };

  useEffect(() => {
    props.expenseCategory === "project" && getProjDetails();
    props.expenseCategory === "salary" && getEmployeeNames();
  }, []);

  return (
    <>
      <div className="border my-4 rounded-xl border-gray-900 overflow-hidden">
        <div className="flex p-4 rounded-t-lg justify-between mb-2 bg-blue-900 text-white">
          <p className="text-lg font-semibold">
            {formatDate(props.expenseDate)}
          </p>
          <p className="">
            Category :{" "}
            <span className="font-semibold">
              {props.expenseCategory.toUpperCase()}
            </span>
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-lg pb-1">
                Amount :{" "}
                <span className="font-bold text-xl text-red-600">
                  {props.expenseAmount}
                </span>
              </p>
              {props.expenseCategory === "salary" && empData && (
                <p className="text-lg pb-1">
                  Employee Name :{" "}
                  <span className="font-bold text-blue-900">
                    {getEmployeeNameById(props.empId)}
                  </span>
                </p>
              )}
            </div>
            {props.expenseComments && (
              <p className="text-lg">
                Details :{" "}
                <span className="text-indigo-800 font-semibold">
                  {props.expenseComments}
                </span>
              </p>
            )}
          </div>

          <div className="text-lg flex justify-between">
            <div>
              {projectDetails && (
                <>
                  <p>
                    Project :{" "}
                    <span className="font-semibold">
                      {projectDetails.projectName}
                    </span>
                  </p>
                  <p>
                    Product :{" "}
                    <span className="font-semibold">
                      {projectDetails.productName}
                    </span>
                  </p>
                </>
              )}
            </div>
            <div>
              {props.billId && (
                <p className="text-lg mt-2">Bill ID : {props.billId}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
