import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function Purchases() {
  const [purchases, setPurchases] = useState();

  const getPurchaseNames = async () => {
    const config = {
      url: "http://localhost:4000/purchase/all",
      method: "get",
    };
    const names = await axios(config);
    setPurchases(names.data);
  };

  useEffect(() => {
    getPurchaseNames();
  }, []);

  return (
    <>
      <div className="px-8">
        <p className="text-2xl font-semibold my-4">Purchases</p>
        {purchases &&
          purchases.map((purchase) => (
            <div className="border rounded-full border-gray-900 my-4 flex items-center text-lg justify-between">
              <p className="bg-indigo-950 rounded-l-full p-4 w-1/5 text-white font-semibold text-white">{purchase.productName}</p>
              <p className="rounded-l-full w-1/5 text-lg">{purchase.projectName}</p>

              <p className="text-lg font-semibold bg-green-600 p-2 m-2 w-fit rounded-full text-white flex items-center gap-1">
                <FaRupeeSign /> {purchase.finalPriceProduct}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
