import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import Spinner from "../Spinner";

export default function CompanyCard() {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyGSTN: "",
    projects: [],
    companyAddress: {},
    companyPOC: {},
  });
  const navigate = useNavigate();
  const { clientId } = useParams();
  const getClientData = async (clientId) => {
    const config = {
      url: "http://localhost:4000/client/get",
      method: "get",
      params: {
        clientId: clientId,
      },
    };
    axios(config)
      .then((res) => setCompanyData(res.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getClientData(clientId);
  }, []);
  return (
    <Spinner
      component={
        <>
          <IoArrowBackCircle
            size={35}
            color="green"
            className="cursor-pointer mb-2"
            onClick={() => navigate(-1)}
          />
          {companyData && (
            <div className=" border rounded-lg">
              <p className="text-xl font-bold rounded-t-lg text-white p-4 bg-indigo-900">
                {companyData.companyName}
              </p>
              <div className="flex p-3">
                <div className="w-3/4">
                  <p className="text-lg my-4">
                    GST Number :{" "}
                    <span className="font-semibold">
                      {companyData.companyGSTN}
                    </span>
                  </p>

                  <div className="mt-4 bg-gray-100 w-2/5 p-2 rounded-lg">
                    <p className="font-semibold text-xl pb-2">Projects</p>
                    {companyData.projects.map((project) => (
                      <Link
                        key={project.projectId}
                        to={`/projects/${project.projectId}`}
                      >
                        <p className="font-semibold text-lg my-1 hover:text-indigo-800 ">
                          {project.projectName}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="w-1/4 ">
                  <div className="my-4">
                    <div className="flex gap-2 items-center">
                      <FaMapLocationDot size={28} color="#EF9B0F" />
                      <p className="font-semibold text-lg">Company Address :</p>
                    </div>
                    {Object.entries(companyData.companyAddress).map(
                      ([key, value]) => (
                        <p className="pl-3" key={key}>
                          {value}
                        </p>
                      )
                    )}
                  </div>
                  <div className="my-4">
                    <div className="flex gap-2 items-center">
                      <IoMdContact size={32} color="#007FFF" />
                      <p className="font-semibold text-lg">
                        Point of Contact :
                      </p>
                    </div>
                    {Object.entries(companyData.companyPOC).map(
                      ([key, value]) => (
                        <p className="pl-3" key={key}>
                          {key}: {value}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }
    />
  );
}
