import axios from "axios";
import { React, useEffect, useState } from "react";
import CompanyCard from "../components/cards/CompanyCard";
import Spinner from "../components/Spinner";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import CompanyForm from "../components/forms/CompanyForm";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function Companies() {
  const [clientName, setClients] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const config = {
      params: {
        onlyNames: true,
      },
    };
    axios
      .get("http://localhost:4000/client/get", config)
      .then((res) => setClients(res.data))
      .catch((e) => console.error(e));
  }, [temp]);

  return (
    <>
      <Spinner
        component={
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
                  onClick={() => {
                    setIsForm(true);
                    navigate("/clients");
                  }}
                />
              )}
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {isForm ? (
                      <CompanyForm setIsForm={setIsForm} setTemp={setTemp} />
                    ) : (
                      <>
                        {clientName.map((client) => (
                          <Link key={client._id} to={`/clients/${client._id}`}>
                            <div key={client._id} className="my-2">
                              <div className="border p-3 rounded-full text-xl cursor-pointer flex justify-between">
                                {client.companyName}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </>
                }
              ></Route>
              <Route path=":clientId" element={<CompanyCard />} />
            </Routes>
          </div>
        }
      />
    </>
  );
}
