import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import NoData from "../../../shared/components/NoData/NoData";
import {
  axiosInstance,
  category,
} from "../../../../services/apiUrls/apiUrl.js";

import axios from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  const {
    register,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // modal update
  const [idUpdate, setidUpdate] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = ({ prevname, previd }) => {
    setidUpdate(previd);
    setValue("name", prevname);
    setShowUpdate(true);
  };

  let onSubmitupdate = async (data) => {
    console.log(idUpdate);
    try {
      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${idUpdate}`,
        data,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast.success("updated sucssed");
      getCategoriesList(5, 1, "");
      handleCloseUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  // let selectCatById = async () => {
  //   try {
  //     let nameCat = await axios.get(
  //       `https://upskilling-egypt.com:3006/api/v1/Category/${idUpdate}`,
  //       { headers: { Authorization: localStorage.getItem("token") } }
  //     );
  //     console.log(nameCat.data.name);
  //     // setupdatedvalue(nameCat.data.name);
  //     console.log(nameCat.data.name, idUpdate);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // modal add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (selectedId) => {
    setId(selectedId);
    setShow(true);

  };

  const [searchName, setSearchName] = useState("");
  const [totalNumberOfPages, settotalNumberOfPages] = useState(0);

  let GetName = (e) => {
    setSearchName(e.target.value);
    getCategoriesList(10, 1, e.target.value);
  };
  const [CategoriesList, setCategoriesList] = useState([]);
  let getCategoriesList = async (pageSize, pageNumber, name) => {
    try {
      let response = await axiosInstance.get(
        category.getAllCategory(pageSize, pageNumber, name)
      );
      settotalNumberOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
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
       handleClose();

       getCategoriesList(5, 1, "");
       toast.success("this category deleted ");

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCategoriesList(5, 1, "");
  }, []);
  // const [newCategory, setnewCategory] = useState("")
  let onSubmit = async (data) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(`${data.name} added sucssed`);
      handleCloseAdd();
      getCategoriesList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        onSubmit={handleSubmit(onSubmitupdate)}
        className=""
        show={showUpdate}
        onHide={handleCloseUpdate}
      >
        <Modal.Header className="border-0">
          <Modal.Title className="w-100 p-4">
            <div className="w-100 d-flex justify-content-between">
              <div>update Category</div>
              <div>
                <i
                  className="fa-solid fa-xmark text-danger  border border-2 border-danger px-2 p-1 rounded-circle "
                  onClick={handleCloseUpdate}
                ></i>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className=" px-4">
            <div>
              <div className="input-group  my-4">
                <input
                  type="text"
                  className="form-control border-0 bg-gray rounded-0 p-3"
                  id="oldCat"
                  placeholder="Category Name "
                  {...register("name", { required: "Add Category Name" })}
                />
              </div>
              <div>
                {errors.name && (
                  <div className="text-danger fs-6">{errors.name.message}</div>
                )}
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success mt-5 px-5 my-3">update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        onSubmit={handleSubmit(onSubmit)}
        className=""
        show={showAdd}
        onHide={handleCloseAdd}
      >
        <Modal.Header className="border-0">
          <Modal.Title className="w-100 p-4">
            <div className="w-100 d-flex justify-content-between">
              <div>Add Category</div>
              <div>
                <i
                  className="fa-solid fa-xmark text-danger  border border-2 border-danger px-2 p-1 rounded-circle "
                  onClick={handleCloseAdd}
                ></i>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=" px-4">
            <div>
              <div className="input-group  my-4">
                <input
                  type="text"
                  className="form-control border-0 bg-gray rounded-0 p-3"
                  placeholder="Category Name "
                  {...register("name", { required: "Add Category Name" })}
                />
              </div>
              <div>
                {errors.name && (
                  <div className="text-danger fs-6">{errors.name.message}</div>
                )}
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success mt-5 px-5 my-3">save</button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer className="border-0">
          <button className="btn btn-success  w-100 my-3">Login</button>
           <Button className="btn  px-5 btn-lg btn-success"   onClick={handleCloseAdd}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>

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

      <div className="my-5">
        <div className="row justify-content-center g-2">
          <div className="col-md-6">
            <div className="">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Search here by categories ..."
                onChange={GetName}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <h3>Categories Table Details</h3>
          <span>You can check all details</span>
        </div>
        <div>
          <button
            className="btn  px-5 btn-lg btn-success"
            onClick={handleShowAdd}
          >
            Add New Item
          </button>
        </div>
      </div>

      {CategoriesList.length > 0 ? (
        <div>
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
                      <i
                        className="fa-regular fa-pen-to-square text-warning mx-1"
                        onClick={() => {
                          handleShowUpdate({
                            prevname: category.name,
                            previd: category.id,
                          });
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="...">
            <ul className="pagination " >
              {totalNumberOfPages.map((p) => (
                <li
                  key={p}
                  className="page-item "

                  onClick={() => {
                    getCategoriesList(5, p, "");
                  }}
                >
                  <span  className="page-link">{p}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
