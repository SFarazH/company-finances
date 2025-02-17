import { React, useEffect, useState } from "react";
import axios from "axios";
import InsightCard from "./cards/InsightsCard";
import { FaBuilding, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";

export default function KPI() {
  const [kpiArray, setKpi] = useState([]);

  const kpi = [
    {
      id: 1,
      category: "Clients",
      value: kpiArray.clientCount,
      icon: <FaBuilding size={30} />,
      link: "/clients",
    },
    {
      id: 2,
      category: "Active Projects",
      value: kpiArray.activeProjects,
      icon: <MdAssignment size={35} />,
      link: "/projects",
    },
    {
      id: 3,
      category: "Sales (Month)",
      value: `${kpiArray.payments} /-`,
      icon: <FaRupeeSign size={30} />,
      link: "/payments",
    },
    {
      id: 4,
      category: "Expenses (Month)",
      value: `${kpiArray.expenses} /-`,
      icon: <FaShoppingCart size={30} />,
      link: "/expenses",
    },
  ];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/admin`)
      .then((res) => {
        setKpi(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="flex gap-8 px-8 bg-[#81523F] text-[#E8EEF2]">
        {kpi.map((k) => (
          <Link className="w-1/4" to={k.link} key={k.id}>
            <InsightCard {...k} />
          </Link>
        ))}
      </div>
    </>
  );
}
