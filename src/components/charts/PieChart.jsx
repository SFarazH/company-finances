import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const [liabilityData, setLiabilityData] = useState(null);
  const getData = async () => {
    const url1 = `${process.env.REACT_APP_BACKEND_URL}/project/liability`;
    const url2 = `${process.env.REACT_APP_BACKEND_URL}/purchase/liability`;

    axios
      .all([axios.get(url1), axios.get(url2)])
      .then((res) => {
        const result = [];
        res.map((data) => {
          result.push(data.data);
        });
        setLiabilityData(result);
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    getData();
  }, []);

  const data = {
    labels: ["Project", "Purchase"],
    datasets: [{ data: liabilityData, backgroundColor: ["red", "green"] }],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
