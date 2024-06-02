import React, { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-around">
      <InfinitySpin
        visible={true}
        width="200"
        color="black"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Spinner;
