import { React, useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import InsightCard from "./components/InsightsCard";
import { FaRupeeSign, FaBuilding, FaShoppingCart } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import KPI from "./components/KPI";
import Companies from "./pages/Companies";
import Projects from "./pages/Projects";
import ProjectCard from "./components/ProjectCard";
import Expenses from "./pages/Expenses";

const Dashboard = () => {
  //   console.log(State.getStatesOfCountry("IN"));
  // console.log(Country.getAllCountries())
  const [projectData, setProjectData] = useState(null);
  const [paymentsData, setPaymentData] = useState(null);
  // const [projectData, setProjectData] = useState([]);

  // useEffect(() => {
  //   const config = {
  //     url: "http://localhost:4000/project/all",
  //     method: "get",
  //     params: {
  //       status: false,
  //     },
  //   };
  //   axios(config)
  //     .then((res) => {
  //       setProjectData(res.data);
  //       console.log(projectData);
  //     })
  //     .catch((e) => console.error(e));
  // }, []);

  // const [pId, setPId] = useState("");

  // useEffect(() => {
  //   const config = {
  //     url: "http://localhost:4000/project/id",
  //     method: "get",
  //     params: {
  //       projectId: pId,
  //     },
  //   };
  //   axios(config)
  //     .then((res) => console.log(res.data.project))
  //     .catch((e) => console.error(e));
  // }, [pId]);

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
      <div className="p-4 ">
        <KPI />
        {/* <Companies /> */}
        {/* <Projects /> */}
        {/* {(projectData && paymentsData) ? <ProjectCard {...combinedData} /> : <h2>Please wait</h2>} */}
        <Expenses/>
        {/* <div className="bg-red-200 container">aa</div> */}
      </div>
      {/* <div className={`flex-shrink-0 h-screen w-16 md:w-60 `}>
        {projectData.map((proj) => (
          <>
            <h4
              className="border p-2 shadow m-2 hover:border-red-500"
              onClick={() => setPId(proj._id)}
            >
              {proj.projectName}
            </h4>
          </>
        ))}
      </div> */}
    </>
  );
};

export default Dashboard;
