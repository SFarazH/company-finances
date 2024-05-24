import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";

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
                // console.log(project)
                <Link
                  to={`/projects/${project.projectId}`}
                  onClick={() => console.log(project.projectId)}
                >
                  <p>{project.projectName}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-1/4">
            <div className="my-4">
              <div className="flex gap-2 items-center">
                <FaMapLocationDot size={28} color="#EF9B0F" />
                <p className="font-semibold text-lg">Company Address :</p>
              </div>
              {Object.entries(props.companyAddress).map(([key, value]) => (
                <p className="pl-3" key={key}>
                  {value}
                </p>
              ))}
            </div>
            <div className="my-4">
              <div className="flex gap-2 items-center">
                <IoMdContact size={32} color="#007FFF"/>
                <p className="font-semibold text-lg">Point of Contact :</p>
              </div>
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
