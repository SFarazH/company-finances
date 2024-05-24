import { React, useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";

const Dashboard = () => {
  //   console.log(State.getStatesOfCountry("IN"));
  // console.log(Country.getAllCountries())
  const [projectData, setProjectData] = useState(null);
  const [paymentsData, setPaymentData] = useState(null);

  const fetchProjectData = async () => {
    try {
      const projectConfig = {
        url: "http://localhost:4000/project/id",
        method: "get",
        params: { projectId: "6645a500553bc5e81381b97a" },
      };
      const projectResponse = await axios(projectConfig);
      setProjectData(projectResponse.data);

      const paymentsConfig = {
        url: "http://localhost:4000/payment/id",
        method: "get",
        params: { projectId: "6645a500553bc5e81381b97a" },
      };
      const paymentsResponse = await axios(paymentsConfig);
      setPaymentData(paymentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  const combinedData = { ...projectData, payments: paymentsData };

  useEffect(() => {
    // fetchProjectData();
  }, []);

  return (
    <>
      <div className="px-8">
        <p className="text-2xl">Dashboard</p>
      </div>
    </>
  );
};

export default Dashboard;
