import { React, useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import CompanyForm from "./components/forms/CompanyForm";

const Dashboard = () => {
  //   console.log(State.getStatesOfCountry("IN"));
  // console.log(Country.getAllCountries())

  useEffect(() => {
    // fetchProjectData();
  }, []);

  return (
    <>
      <div className="px-8">
        <p className="text-2xl">Dashboard</p>
        <CompanyForm/>
      </div>
    </>
  );
};

export default Dashboard;
