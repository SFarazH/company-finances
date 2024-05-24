import axios from "axios";
import { React, useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import Spinner from "../components/Spinner";

export default function Companies() {
  const [clientName, setClients] = useState([]);

  const [expandedCompany, setExpandedCompany] = useState(null);

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
  }, []);

  return (
    <>
      {showLoader ? <Spinner/> : <div className="px-8">
        <p className="text-3xl font-semibold my-4 ">Companies</p>
        {clientName.map((client) => (
          <div key={client._id} className="my-2">
            <div
              className="border p-3 rounded-full text-xl cursor-pointer flex justify-between"
              onClick={() => toggleAccordion(client._id)}
            >
              {client.companyName}
              <p>fff</p>
            </div>
            {expandedCompany === client._id && (
              <div className="px-4 py-2">
                <CompanyCard {...client} key={client._id} />
              </div>
            )}
          </div>
        ))}
      </div>}
    </>
  );
}
