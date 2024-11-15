import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import NoData from "../../../shared/components/NoData/NoData";

import axios from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";

export default function CategoriesList() {
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (selectedId) => {
    setShow(true);
    setId(selectedId);
  };

  const [CategoriesList, setCategoriesList] = useState([]);
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=20&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setCategoriesList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteaCat = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      getCategoriesList();

      handleClose();
      toast.success("this category deleted ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <>
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteFun={deleteaCat}
        deltedItem={"cat"}
      />

      <Header
        title={"categories"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      {CategoriesList.length > 0 ?  (
        <div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <div>
              <h3>Recipe Table Details</h3>
              <span>You can check all details</span>
            </div>
            <div>
              <button className="btn  px-5 btn-lg btn-success">
                Add New Item{" "}
              </button>
            </div>
          </div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr className="table-active">
                  <th className="p-4  rounded-start-4" scope="col">
                    ID
                  </th>
                  <th className="py-4" scope="col">
                    NAME
                  </th>

                  <th className="py-4" scope="col">
                  Date
                  </th>

                  <th className="py-4 rounded-end-4" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CategoriesList.map((category) => (
                  <tr key={category.id}>
                    <th className="p-4 " scope="row">
                      {category.id}
                    </th>
                    <td className="py-4">{category.name}</td>
                    <td className="py-4">{category.creationDate}</td>

                    <td className="py-4">
                      <i
                        className="fa-regular fa-trash-can text-danger mx-1 "
                        onClick={() => {
                          handleShow(category.id);
                        }}
                      ></i>
                      <i className="fa-regular fa-pen-to-square text-warning mx-1"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ):(
        <NoData />
      ) }
    </>
  );
}
