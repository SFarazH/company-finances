import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { PiCpuFill } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";
export default function ProjectNames(props) {

  return (
    <>
      <div className="border rounded-lg p-3 my-2">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">{props.projectName}</p>
          <div className="flex gap-4 items-center">
            <FaCircle size="1.5em" color={props.isClosed ? `red` : `green`} />
            {props.projectType === "software" ? (
              <FaLaptop size="2em" />
            ) : (
              <PiCpuFill size="2em" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
