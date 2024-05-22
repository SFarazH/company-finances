import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { PiCpuFill } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";

export default function ProjectCard(props) {
  const payment = [
    {
      _id: "66460b28ac8e6742981b96cc",
      receivedAmount: 10000,
      paymentDate: "2024-03-14T18:30:00.000Z",
    },
    {
      _id: "66460b28ac8e6742981b96cc",
      receivedAmount: 12000,
      paymentDate: "2024-05-01T18:30:00.000Z",
    },
  ];
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
        <p>{props.price}</p>
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
  return (
    <>
      <div className="border rounded-lg p-3 my-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">
            {props.projectName} - <span className="pl-4">{props?.client}</span>
          </p>
          <div className="flex gap-4 items-center">
            <FaCircle size="1.5em" color={props.isClosed ? `red` : `green`} />
            {props.projectType === "software" ? (
              <FaLaptop size="2em" />
            ) : (
              <PiCpuFill size="2em" />
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="">
            <p className="my-1">Project Manager : {props.projectManager}</p>

            {props.projectConsultant && (
              <p className="my-1">
                Project Consultant : {props.projectConsultant.name}
              </p>
            )}

            <p className="my-1">
              Received Date :{" "}
              <span className="font-semibold">
                {formatDate(props.dateReceived)}
              </span>
            </p>

            <p className="my-1">
              Delivery Date :{" "}
              <span className="font-semibold">
                {formatDate(props.deliveryDate)}
              </span>
            </p>
            <div className="p-4 bg-red-100 mt-2">
              <p className="text-lg py-2 font-semibold">Purchases</p>
              {props.projectPurchasesArray.map((purchase) => (
                <p>{purchase.productName}</p>
              ))}
            </div>
          </div>

          <div className="w-1/3">
            <div className="bg-gray-100 p-4">
              <p className="text-lg py-2 font-semibold">Payments</p>

              <div className="flex justify-between items-center gap-2">
                <ProgressBar
                  progressPercentage={props.paymentPercentReceivedTillDate}
                />

                <p className="font-semibold text-md text-center">
                  ({Math.round(props.paymentPercentReceivedTillDate)}%)
                </p>
              </div>

              <div className="mt-4">
                {props.payments.map((pay) => (
                  <div className="flex justify-between">
                    <p>{formatDate(pay.paymentDate)}</p>
                    <p className="font-semibold">{pay.receivedAmount}</p>
                  </div>
                ))}
                <br />
                <PriceList
                  category="Amount Received"
                  price={props.paymentReceivedTillDate}
                  topborder
                />
                <PriceList
                  category="Liability"
                  price={props.projectLiability}
                />
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <div className=" bg-gray-100 px-4">
              <p className="text-lg py-2 font-semibold">Finances</p>
              <PriceList category="Net Receivable" price={props.finalPrice} />
              <br />
              <PriceList
                category="Project Purchases"
                price={props.projectPurchasesCost}
              />
              {Object.entries(props.GST).map(([key, value]) => (
                <PriceList
                  category={`${key} - ${value}%`}
                  price={props.finalPrice * (value / 100)}
                />
              ))}
              <PriceList
                category={`TDS - ${props.TDS}%`}
                price={props.finalPrice * (props.TDS / 100)}
              />
              <PriceList
                category="Consultant Fee"
                price={
                  props.projectConsultant ? props.projectConsultant.price : 0
                }
              />
              <br />
              <PriceList category="Profit" price={props.netProfit} topborder />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
