import React from "react";
import "../css/loader.css";
import "../css/bootstrap.min.css";

const Loader = () => {
  return (
    <div className=" loader container ">
      <div className="spinner">
        <div className="loader-text text-white">
          <h5>Loading...</h5>
        </div>
        <div className="spinner-section spinner-section-red"></div>
        <div className="spinner-section spinner-section-green"></div>
        <div className="spinner-section spinner-section-blue"></div>
      </div>
    </div>
  );
};

export default Loader;
