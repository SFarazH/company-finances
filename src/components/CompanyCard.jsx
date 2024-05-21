import React, { useState, useEffect } from "react";

export default function CompanyCard(props) {
  const data = {
    companyAddress: {
      street: "C-25, Aliganj",
      city: "Lucknow",
      state: "UP",
      country: "India",
      pincode: 226023,
    },
    companyPOC: {
      name: "Faraz",
      email: "f@a.com",
    },
    _id: "66446f253f12079c2fd639ea",
    companyName: "OneBigBit",
    companyGSTN: "FRSJ5707",
    projects: [
      {
        projectId: "6645a4f5553bc5e81381b976",
        projectName: "LMS",
      },
      {
        projectId: "6645a500553bc5e81381b97a",
        projectName: "PCA Toolkit",
      },
      {
        projectId: "6645a511553bc5e81381b97e",
        projectName: "Game parlour ",
      },
      {
        projectId: "6645a51b553bc5e81381b982",
        projectName: "Game parlour ",
      },
      {
        projectId: "6645a585490cadb89b3c2bb8",
        projectName: "Game parlour ",
      },
      {
        projectId: "6645a593490cadb89b3c2bbc",
        projectName: "Game parlour ",
      },
    ],
    __v: 20,
  };
  return (
    <>
      <div className="mt-4 border rounded-lg p-4">
        <p className="text-xl font-bold">{props.companyName}</p>
        <div className="flex">
          <div className="w-3/4">
            <p className="text-lg my-4">
              GST Number : <span className="font-semibold">{props.companyGSTN}</span>
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
