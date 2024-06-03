import React, { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({ component }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return showLoader ? (
    <>
      <div className="flex justify-around">
        <InfinitySpin
          visible={true}
          width="200"
          color="black"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  ) : (
    component
  );
};

export default Spinner;
