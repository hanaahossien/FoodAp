import React from "react";
import nodata from "../../../../assets/nodata.svg";

export default function NoData() {
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 text-center   m-4">
        <div>
          <img src={nodata} className="w-25" alt="" />
        </div>
        <h4 className="my-4"> No Data ! </h4>
        <span className="text-muted">
          are you sure you want to delete this item ? <br/>if you are sure just click
          on delete it
        </span>
      </div>
      </div>
    </div>

    </>
  );
}
