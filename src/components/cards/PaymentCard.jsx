import React from "react";
import { FaRupeeSign, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../functions";

export default function PaymentCard(props) {
  const p = {
    billingAddress: "Airport Road, Nagpur, MH, India, undefined",
    paymentDate: "2024-05-14T18:30:00.000Z",
    projectId: "664603b4ac8e6742981b96c3",
    projectName: "Mobile Application",
    receivedAmount: 10000,
    _id: "66460b28ac8e6742981b96cc",
  };

  return (
    <>
      <div className="border p-2 rounded-full border-gray-400 my-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold bg-indigo-950 w-fit p-3 rounded-full text-white">
            {formatDate(props.paymentDate)}
          </p>
          <p className="text-2xl font-semibold">{props.projectName}</p>

          <div className="flex gap-8 items-center">
            <Link target="_blank" to={`/projects/${props.projectId}`}>
              <FaExternalLinkAlt size={20} />
            </Link>
            <p className="text-lg font-semibold bg-green-600 w-fit p-3 rounded-full text-white flex items-center gap-1">
              <FaRupeeSign /> {props.receivedAmount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
