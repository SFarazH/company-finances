import { React, useEffect, useState } from "react";
import axios from "axios";
import InsightCard from "./InsightsCard";
import { FaBuilding, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

export default function KPI() {
  const [kpiArray, setKpi] = useState([]);

  const kpi = [
    {
      id: 1,
      category: "Clients",
      value: kpiArray.clientCount,
      icon: <FaBuilding size={30} />,
    },
    {
      id: 2,
      category: "Active Projects",
      value: kpiArray.activeProjects,
      icon: <MdAssignment size={35} />,
    },
    {
      id: 3,
      category: "Sales (Month)",
      value: `${kpiArray.payments} /-`,
      icon: <FaRupeeSign size={30} />,
    },
    {
      id: 4,
      category: "Expenses (Month)",
      value: `${kpiArray.expenses} /-`,
      icon: <FaShoppingCart size={30} />,
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/admin")
      .then((res) => {
        setKpi(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="flex gap-8 px-8">
        {kpi.map((k) => (
          <InsightCard {...k} />
        ))}
      </div>
    </>
  );
}
