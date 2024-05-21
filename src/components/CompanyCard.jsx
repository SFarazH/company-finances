import React, { useState, useEffect } from "react";

export default function CompanyCard(props) {
  return (
    <>
      <div className=" border rounded-lg p-4">
        <p className="text-xl font-bold">{props.companyName}</p>
        <div className="flex">
          <div className="w-3/4">
            <p className="text-lg my-4">
              GST Number :{" "}
              <span className="font-semibold">{props.companyGSTN}</span>
            </p>

            <div className="my-4">
              <p className="font-semibold text-lg pb-2">Projects</p>
              {props.projects.map((project) => (
                <p>{project.projectName}</p>
              ))}
            </div>
          </div>
          <div className="w-1/4">
            <div className="my-4">
              <p className="font-semibold text-lg">Company Address :</p>
              {Object.entries(props.companyAddress).map(([key, value]) => (
                <p className="pl-3" key={key}>
                  {value}
                </p>
              ))}
            </div>
            <div className="my-4">
              <p className="font-semibold text-lg">Point of Contact :</p>
              {Object.entries(props.companyPOC).map(([key, value]) => (
                <p className="pl-3" key={key}>
                  {key}: {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
