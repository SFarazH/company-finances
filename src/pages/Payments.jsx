import axios from "axios";
import React, { useState, useEffect } from "react";
import PaymentCard from "../components/cards/PaymentCard";
import PaymentForm from "../components/forms/PaymentForm";
import Spinner from "../components/Spinner";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import SetQuery from "../components/SetQuery";

export default function Payments() {
  const [isForm, setIsForm] = useState(false);
  const [paymentData, setPayment] = useState(null);
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
    projectId: "",
  });
  const [temp, setTemp] = useState(0);
  const getPayments = async () => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/payment/get",
      method: "get",
      params: queryParams,
    };

    try {
      const payments = await axios(config);
      setPayment(payments.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, [temp]);

  return (
    <Spinner
      component={
        <div className="px-8">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold my-4">Payments</p>
            {isForm ? (
              <IoCloseCircle
                onClick={() => setIsForm(false)}
                size={40}
                color="red"
                className="cursor-pointer"
              />
            ) : (
              <IoAddCircle
                onClick={() => {
                  setIsForm(true);
                }}
                size={40}
                color="green"
                className="cursor-pointer"
              />
            )}
          </div>
          {isForm ? (
            <PaymentForm setIsForm={setIsForm} setTemp={setTemp} />
          ) : (
            <>
              <SetQuery
                setQueryParams={setQueryParams}
                setTemp={setTemp}
                isProject
              />
              <div className="mt-8">
                {paymentData && paymentData.length > 0 ? (
                  paymentData.map((payment) => <PaymentCard {...payment} />)
                ) : (
                  <p className="text-lg text-red-500 font-semibold text-center mt-4">
                    No payments found!
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      }
    />
  );
}
