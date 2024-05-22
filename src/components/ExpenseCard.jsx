import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ExpenseCard(props) {
  const [projectDetails, setProjectData] = useState(null);
  const getProjDetails = async () => {
    const config = {
      url: "http://localhost:4000/purchase/id",
      method: "get",
      params: {
        projectPurchaseId: "664d8c9f54f8eb79f7179dda",
      },
    };
    try {
      const proj = await axios(config);
      setProjectData(proj.data);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  useEffect(() => {
    props.expenseCategory === "project" && getProjDetails();
  }, []);

  return (
    <>
      <div className="border my-4 rounded-t-lg border-gray-900">
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
          <p className="text-lg pb-1">
            Amount :{" "}
            <span className="font-bold  text-red-600">
              {props.expenseAmount}
            </span>
          </p>

          <div className="text-lg">
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

          <p className="text-lg">
            Details :{" "}
            <span className="text-indigo-800 font-semibold">
              {props.expenseComments}
            </span>
          </p>
          {props.billId && (
            <p className="text-lg mt-2">Bill ID : {props.billId}</p>
          )}
        </div>
      </div>
    </>
  );
}
