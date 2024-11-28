import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { axiosInstance, users } from "../../../../services/apiUrls/apiUrl";
import noimg from "../../../../assets/nodata.svg";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function User() {
  const [allUser, setAlluser] = useState([]);

  const [pagination, setPagination] = useState([]);

  let getUsers = async (pageSize, pageNu, userName) => {
    try {
      let req = await axiosInstance.get(
        users.getAllusers(pageSize, pageNu, userName)
      );
      setAlluser(req.data.data);

      setPagination(
        Array(req.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };
  let getName = (e) => {
    console.log(e.target.value);
    getUsers(55, 1, e.target.value);
  };

  // let getUserspagination = async (pageSize,pageNu) => {
  //   try {
  //     let req = await axiosInstance.get(users.getAllusers(pageSize, pageNu));
  //     setAlluser(req.data.data);

  //     setPagination(
  //       Array(req.data.totalNumberOfPages)
  //         .fill()
  //         .map((_, i) => i + 1)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // 1551
  // https://upskilling-egypt.com:3006/api/v1/Users/?email=hossienhanaa%40gmail.com

  let deleteUsers = async (id) => {
    try {
      let req = await axiosInstance.delete(users.deleteUser(id));
      getUsers(55, 1, "");
      console.log(req);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers(55, 1, "");
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [userData, setuserData] = useState({});
  const handleShow = () => {
    setShow(true);
  };

  let getUserById = async (id) => {
    const response = await axiosInstance.get(users.getUserById(id));
    setuserData(response.data);
    console.log(response.data);
    handleShow();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border-0  deleteconfirmatin">
          <Modal.Title>
            <i
              className="fa-solid fa-xmark text-danger  border border-2 border-danger px-2 p-1 rounded-circle "
              onClick={handleClose}
            ></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-5">
          <div>{/* //  <img src={nodata} alt=""  /> */}</div>
          {userData.imagePath ? (
            <img
              className="w-50 rounded-2"
              src={`https://upskilling-egypt.com:3006/${userData.imagePath}`}
              alt=""
            />
          ) : (
            <img
            className="w-25 rounded-2"
            src={noimg}
            alt=""
          />
          )}
          <h3 className="my-3 h6"> Name : {userData.userName} </h3>

          <h3 className="my-3 h6"> country : {userData.country} </h3>
          <h3 className="my-3 h6"> email : {userData.email} </h3>
          <h3 className="my-3 h6"> phone : {userData.phoneNumber} </h3>

        </Modal.Body>
        <Modal.Footer className="border-0"></Modal.Footer>
      </Modal>
      <Header
        title={"Users "}
        item={"List"}
        desc=" You can now add your items that any user can order it from the Application and you can edit"
      />

      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <h3>Users Table Details</h3>
          <span>You can check all details</span>
        </div>
      </div>

      <div className="my-5">
        <div className="row justify-content-center g-2">
          <div className="col-md-6">
            <div className="">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Search  by User Name ..."
                onChange={getName}
              />
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th className="p-4  rounded-start-4" scope="col">
              userName
            </th>
            <th className="py-4" scope="col">
              Image
            </th>

            <th className="py-4" scope="col">
              Country
            </th>
            <th className="py-4" scope="col">
              Email
            </th>
            <th className="py-4" scope="col">
              Phone
            </th>

            <th className="py-4 rounded-end-4" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user) => (
            <tr key={user.id}>
              <td className="p-4 " scope="row">
                {user.userName}
              </td>

              <td className="py-4">
                {user.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                    style={{ width: 60 }}
                    className="rounded-2"
                    alt=""
                  />
                ) : (
                  <img
                    src={noimg}
                    style={{ width: 40 }}
                    className="rounded-2"
                    alt=""
                  />
                )}
              </td>
              <td className="p-4 " scope="row">
                {user.country}
              </td>
              <td className="p-4 " scope="row">
                {user.email}
              </td>
              <td className="p-4 " scope="row">
                {user.phoneNumber}
              </td>
              <td>
                <div className="dropdown">
                  <i className="fa-solid fa-ellipsis-vertical dropbtn"></i>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <span href="#">
                        <i
                          className="fa-regular fa-trash-can text-danger"
                          onClick={() => {
                            deleteUsers(user.id);
                          }}
                        ></i>
                      </span>
                      <span href="#">
                        <i
                          onClick={() => getUserById(user.id)}
                          className="fa-regular text-success  fa-eye"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <nav aria-label="...">
            <ul className="pagination " >
              {pagination.map((p) => (
                <li
                  key={p}
                  className="page-item "

                  onClick={() => {
                    getUsers(55,p,"")
                  }}
                >
                  <span  className="page-link">{p}</span>
                </li>
              ))}
            </ul>
          </nav> */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pagination.map((p) => (
            <li
              onClick={() => {
                getUsers(55, p, "");
              }}
              key={p}
              className="page-item "
            >
              <span className="page-link  " href="#">
                {p}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
