import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function PurchaseCard(props) {
  const [payments, setPayments] = useState(null);

  const getPaymentsDone = async (id) => {
    const config = {
      url: "http://localhost:4000/expense/id",
      method: "get",
      params: {
        purchaseId: id,
      },
    };
    axios(config)
      .then((res) => {
        setPayments(res.data);
        console.log(res.data);
      })
      .catch((e) => console.error(e));
  };
  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
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

  useEffect(() => {
    getPaymentsDone(props._id);
  }, [props]);
  return (
    <>
      <div className="border p-4 rounded-lg  w-2/3 ">
        <p className="font-semibold text-xl">
          {props.productName} -{" "}
          <span className="text-indigo-800">{props.projectName}</span>
        </p>
        <div className="flex justify-between">
          <div className="w-1/3">
            {/* <p>{formatDate(props.purchaseDate)}</p> */}

            <div className="text-lg my-4 flex items-center gap-2">
              <p>Price: </p>{" "}
              <p className="font-semibold bg-green-600 p-2 w-fit rounded-full text-white flex items-center gap-1">
                <FaRupeeSign /> {props.finalPriceProduct}
              </p>
            </div>
            <p className="text-lg font-semibold">Payment Completed : </p>
            <div className="flex justify-between items-center gap-2">
              <ProgressBar
                progressPercentage={props.paymentPercentCompletedTillDate}
              />

              <p className="font-semibold text-md text-center">
                ({Math.round(props.paymentPercentCompletedTillDate)}%)
              </p>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 p-2 rounded-lg">
            <div className="text-lg font-semibold mb-4">Payments</div>
            {payments && payments.length > 0 ? (
              <>
                {payments.map((payment) => (
                  <>
                    <div className="flex justify-between text-lg">
                      <p className="">{formatDate(payment.expenseDate)}</p>
                      <p className="text-xl">{payment.expenseAmount}</p>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <p>No payment data</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
