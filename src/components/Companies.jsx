import axios from "axios";
import { React, useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

export default function Companies() {
  const [clientName, setClients] = useState([]);

  const [expandedCompany, setExpandedCompany] = useState(null);

  const toggleAccordion = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/client/get")
      .then((res) => setClients(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div>
        <p className="text-2xl font-semibold">Companies</p>
        {clientName.map((client) => (
          <div key={client._id}>
            <div
              className="border p-2 text-lg cursor-pointer"
              onClick={() => toggleAccordion(client._id)}
            >
              {client.companyName}
            </div>
            {expandedCompany === client._id && (
              <div className="p-2">
                <CompanyCard {...client} key={client._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
