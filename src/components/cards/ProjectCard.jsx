import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { PiCpuFill } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function ProjectCard(props) {
  let navigate = useNavigate();
  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  const PriceList = (props) => {
    return (
      <div
        className={`flex justify-between py-1 ${
          props.topborder && `text-lg font-semibold border-t border-black py-0`
        }`}
      >
        <p>{props.category}</p>
        <p className={`${props.color && `text-${props.color} font-semibold`}`}>
          {props.price}
        </p>
      </div>
    );
  };
  const ProgressBar = ({ progressPercentage }) => {
    return (
      <div className="h-4 w-full bg-gray-300 rounded-xl overflow-hidden border-black">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full rounded-l-xl ${
            progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
          }`}
        ></div>
      </div>
    );
  };

  const [projectData, setProjectData] = useState(null);
  const [paymentsData, setPaymentData] = useState(null);

  const [data, setData] = useState(null);

  const fetchProjectData = async (id) => {
    try {
      const projectConfig = {
        url: "http://localhost:4000/project/id",
        method: "get",
        params: { projectId: id },
      };
      const projectResponse = await axios(projectConfig);
      setProjectData(projectResponse.data);

      const paymentsConfig = {
        url: "http://localhost:4000/payment/id",
        method: "get",
        params: { projectId: id },
      };
      const paymentsResponse = await axios(paymentsConfig);
      setPaymentData(paymentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (projectData && paymentsData) {
      setData({ ...projectData, payments: paymentsData });
    }
  }, [projectData, paymentsData]);

  const { projectId } = useParams();

  useEffect(() => {
    fetchProjectData(projectId);
  }, []);
  return (
    <>
      {data && (
        <div className="mt-2">
          <IoArrowBackCircle
            size={35}
            color="green"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <div className="border rounded-lg p-2 mt-2">
            <div className="flex justify-between items-center mb-8">
              <p className="text-2xl font-semibold">
                <span className="text-[#002147]">{data.projectName}</span> -{" "}
                <span className="pl-4 text-xl">{data.client}</span>
              </p>
              <div className="flex gap-4 items-center">
                <FaCircle
                  size="1.5em"
                  color={data.isClosed ? `red` : `green`}
                />
                {data.projectType === "software" ? (
                  <FaLaptop size="2em" />
                ) : (
                  <PiCpuFill size="2em" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-lg">
                <p className="mb-4">Project Manager : {data.projectManager}</p>

                {data.projectConsultant && (
                  <p className="my-4">
                    Project Consultant : {data.projectConsultant.name}
                  </p>
                )}

                <p className="my-4">
                  Received Date :{" "}
                  <span className="font-semibold">
                    {formatDate(data.dateReceived)}
                  </span>
                </p>

                <p className="my-4">
                  Delivery Date :{" "}
                  <span className="font-bold text-red-500">
                    {formatDate(data.deliveryDate)}
                  </span>
                </p>
              </div>

              <div className="">
                <div className="bg-gray-100 p-2 px-3 rounded-lg">
                  <p className="text-lg py-2 font-semibold">Payments</p>

                  <div className="flex justify-between items-center gap-2">
                    <ProgressBar
                      progressPercentage={data.paymentPercentReceivedTillDate}
                    />

                    <p className="font-semibold text-md text-center">
                      ({Math.round(data.paymentPercentReceivedTillDate)}%)
                    </p>
                  </div>

                  <div className="mt-4">
                    {data.payments.map((pay) => (
                      <div className="flex justify-between">
                        <p>{formatDate(pay.paymentDate)}</p>
                        <p className="font-semibold font-lg">
                          {pay.receivedAmount}
                        </p>
                      </div>
                    ))}
                    <br />
                    <PriceList
                      category="Amount Received"
                      price={data.paymentReceivedTillDate}
                      topborder
                    />
                    <PriceList
                      category="Liability"
                      color="red-500"
                      price={data.projectLiability}
                    />
                  </div>
                </div>
                <div className="p-2 px-3 bg-red-100 mt-3 rounded-lg">
                  <p className="text-lg py-2 font-semibold">Purchases</p>
                  {data.projectPurchasesArray.map((purchase) => (
                    <Link to={`/purchases/${purchase.projectPurcaseId}`}>
                      <p className="text-lg font-semibold">{purchase.productName}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="">
                <div className=" bg-gray-100 p-2 px-3 rounded-lg">
                  <p className="text-lg py-1 font-semibold">Finances</p>
                  <PriceList
                    category="Net Receivable"
                    price={data.finalPrice}
                  />
                  <br />
                  <PriceList
                    category="Project Purchases"
                    price={data.projectPurchasesCost}
                  />
                  {Object.entries(data.GST).map(([key, value]) => (
                    <PriceList
                      category={`${key} - ${value}%`}
                      price={data.finalPrice * (value / 100)}
                    />
                  ))}
                  <PriceList
                    category={`TDS - ${data.TDS}%`}
                    price={data.finalPrice * (data.TDS / 100)}
                  />
                  <PriceList
                    category="Consultant Fee"
                    price={
                      data.projectConsultant ? data.projectConsultant.price : 0
                    }
                  />
                  <br />
                  <PriceList
                    category="Profit"
                    price={data.netProfit}
                    topborder
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
