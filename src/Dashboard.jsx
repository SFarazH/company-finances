import { React, useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";

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
      </div>
    </>
  );
};

export default Dashboard;
