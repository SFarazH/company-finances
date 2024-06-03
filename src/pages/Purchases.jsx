import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import PurchaseCard from "../components/cards/PurchaseCard";
import Spinner from "../components/Spinner";
import { Routes, Route, Link } from "react-router-dom";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import PurchaseForm from "../components/forms/PurchaseForm";
import SetQuery from "../components/SetQuery";

export default function Purchases() {
  const [temp, setTemp] = useState(0);
  const [purchases, setPurchases] = useState();
  const [isForm, setIsForm] = useState(false);
  const [queryParams, setQueryParams] = useState({});

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const getPurchaseNames = async () => {
    const config = {
      url: "https://obb-finance-backend-1.onrender.com/purchase/all",
      method: "get",
      params: queryParams,
    };
    const names = await axios(config);
    setPurchases(names.data);
  };
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    getPurchaseNames();
  }, [temp]);

  return (
    <>
      {showLoader ? (
        <Spinner />
      ) : (
        <div className="px-8">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold my-4">Purchases</p>
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
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {isForm ? (
                    <PurchaseForm setIsForm={setIsForm} />
                  ) : (
                    <>
                      <SetQuery
                        setQueryParams={setQueryParams}
                        setTemp={setTemp}
                      />
                      {purchases && purchases.length > 0 ? (
                        purchases.map((purchase) => (
                          <Link to={`/purchases/${purchase._id}`}>
                            <div className="rounded-xl border p-4 py-2 border-gray-900 my-4 flex items-center text-lg justify-between">
                              <div>
                                <p className="rounded-full bg-indigo-900 text-white w-fit p-1.5 px-2">
                                  {formatDate(purchase.purchaseDate)}
                                </p>
                                <p className="text-xl mt-2 font-semibold ">
                                  {purchase.productName} -{" "}
                                  <span className="text-base">
                                    ({purchase.projectName})
                                  </span>
                                </p>
                              </div>

                              <p className="text-lg font-semibold bg-green-600 p-2 m-2 w-fit rounded-full text-white flex items-center gap-1">
                                <FaRupeeSign /> {purchase.finalPriceProduct}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-lg text-red-500 font-semibold text-center mt-4">
                          No purchases found!
                        </p>
                      )}
                    </>
                  )}
                </div>
              }
            ></Route>
            <Route path=":purchaseId" element={<PurchaseCard />}></Route>
          </Routes>
        </div>
      )}
    </>
  );
}
