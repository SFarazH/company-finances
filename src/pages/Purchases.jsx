import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import PurchaseCard from "../components/PurchaseCard";
import Spinner from "../components/Spinner";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import PurchaseForm from "../components/forms/PurchaseForm";

export default function Purchases() {
  const [purchases, setPurchases] = useState();
  const [isForm, setIsForm] = useState(false);
  const [queryParams, setQueryParams] = useState({
    fromDate: "",
    toDate: "",
    projectId: "",
  });
  const getPurchaseNames = async () => {
    const config = {
      url: "http://localhost:4000/purchase/all",
      method: "get",
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
  }, []);

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
                    purchases &&
                    purchases.map((purchase) => (
                      <Link to={`/purchases/${purchase._id}`}>
                        <div
                          className="border rounded-full border-gray-900 my-4 flex items-center text-lg justify-between"
                          onClick={() => {
                            // getPurchaseById(purchase._id);
                          }}
                        >
                          <p className="bg-indigo-950 rounded-l-full p-4 w-1/5 text-white font-semibold text-white">
                            {purchase.productName}
                          </p>
                          <p className="rounded-l-full w-1/5 text-lg">
                            {purchase.projectName}
                          </p>

                          <p className="text-lg font-semibold bg-green-600 p-2 m-2 w-fit rounded-full text-white flex items-center gap-1">
                            <FaRupeeSign /> {purchase.finalPriceProduct}
                          </p>
                        </div>
                      </Link>
                    ))
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
