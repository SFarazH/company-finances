import React from "react";
export default function InsightCard(props) {
  return (
    <>
      <div className="card p-2 w-1/4 border border-white my-4 rounded-xl">
        <div className="head flex justify-between items-center">
          <div><p className="text-md font-semibold uppercase">{props.category}</p>
          <p className="text-2xl font-bold">{props.value}</p></div>
          {/* <FaRupeeSign size={30}/> */}
          <div className="">{props.icon}</div>
        </div>
        
      </div>
    </>
  );
}
