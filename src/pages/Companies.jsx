import axios from "axios";
import { React, useEffect, useState } from "react";
import CompanyCard from "../components/cards/CompanyCard";
import Spinner from "../components/Spinner";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import CompanyForm from "../components/forms/CompanyForm";

export default function Companies() {
  const [clientName, setClients] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [temp, setTemp] = useState(0);
  const toggleAccordion = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/client/get")
      .then((res) => setClients(res.data))
      .catch((e) => console.error(e));
  }, [temp]);

  return (
    <>
      {showLoader ? (
        <Spinner />
      ) : (
        <div className="px-8">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold my-4 ">Companies</p>
            {isForm ? (
              <IoIosCloseCircle
                color="red"
                size={45}
                className="cursor-pointer"
                onClick={() => setIsForm(false)}
              />
            ) : (
              <IoIosAddCircle
                size={45}
                color="#003262"
                className="cursor-pointer"
                onClick={() => setIsForm(true)}
              />
            )}
          </div>
          {isForm ? (
            <CompanyForm setIsForm={setIsForm} setTemp={setTemp} />
          ) : (
            <>
              {clientName.map((client) => (
                <div key={client._id} className="my-2">
                  <div
                    className="border p-3 rounded-full text-xl cursor-pointer flex justify-between"
                    onClick={() => toggleAccordion(client._id)}
                  >
                    {client.companyName}
                  </div>
                  {expandedCompany === client._id && (
                    <div className="px-4 py-2 transition duration-1000">
                      <CompanyCard {...client} key={client._id} />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
