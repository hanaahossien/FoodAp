/* eslint-disable react/prop-types */
import React from "react";
import man from "../../../../assets/man.svg";

export default function Header({ title, item, desc }) {

  return (
    <div className="header container p-4">
      <div className="row justify-content-center align-items-center" >
        <div className="col-md-7 text-white">
        <h3 className="fw-bold h1">{title} <span className="fw-light">{item}</span></h3>
        <span>{desc} </span>
      </div>
      <div className="col-md-4 text-end"><img src={man} alt=""  /> </div>
      </div>

    </div>
  );
}
