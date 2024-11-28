/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

import { axiosInstance, users } from "../../../../services/apiUrls/apiUrl";
import axios from "axios";

export default function Registration() {
  // hana88
  // hanaa.hossien88@gmail.com
  // @Password32!

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  let profileImage = document.getElementById("profileImage");
  const [isPaswordVisble, setIsPaswordVisble] = useState(false);
  const [isConfPaswordVisble, setIsConfPaswordVisble] = useState(false);

  const [file, setFile] = useState("");
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  let onSubmite = async (data) => {
    let formata = new FormData();
    formata.append("userName", data.userName);
    formata.append("email", data.email);
    formata.append("country", data.country);
    formata.append("phoneNumber", data.phoneNumber);
    formata.append("profileImage", profileImage?.files[0]);
    formata.append("password", data.password);
    formata.append("confirmPassword", data.confirmPassword);

    try {
      console.log(formata);
      let req = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        formata
      );
      //let req = await axiosInstance.post(users.createUser, formata);
      console.log(req);
      toast.success(req.data.message);
      navigate("/verify-account", { state: data.email });
    } catch (error) {
      toast.error(error.message);
    }
    //  toast.success(req.data.message);
  };

  /* // "email": "nadia.mohamed.taha166@gmail.com",
    // "password": "@Password321!" */
  useEffect(() => {}, []);

  return (
    <>
      <div className="auth-conatiner " style={{ backgroundImage: "none" }}>
        <div className="container-fluid overlay-auth">
          <div className="row vh-100 justify-content-around align-items-center">
            <div className="col-md-10  col-sm-8 col-8 bg-white rounded rounded-2 px-5 py-4  ">
              <div className="text-center">
                <img src={logo} alt="" className="img-fluid w-70" />
              </div>
              <div className="py-4">
                <div className="my-3">
                  <h3 className="h5"> Register</h3>
                  <span className="text-muted">
                    Welcome Back! Please enter your details
                  </span>
                </div>
                <form onSubmit={handleSubmit(onSubmite)}>
                  <div className="row">
                    <div className=" col-md-6  mb-2">
                      <div className="input-group  mb-1">
                        <span
                          className="input-group-text border-0 bg-gray"
                          id="basic-addon1"
                        >
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="User Name"
                          {...register("userName", {
                            required: "UserName is required",
                            pattern: {
                              value:
                                /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                              message: "Invalid username ",
                            },
                          })}
                        />
                      </div>
                      <div>
                        {errors.UserName && (
                          <div className="text-danger fs-6">
                            {errors.UserName.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" col-md-6  mb-2">
                      <div className="input-group  mb-1">
                        <span
                          className="input-group-text border-0 bg-gray"
                          id="basic-addon1"
                        >
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="Enter your E-mail"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </div>
                      <div>
                        {errors.email && (
                          <div className="text-danger fs-6">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" col-md-6  mb-2">
                      <div className="input-group mb-1 ">
                        <span className="input-group-text border-0 bg-gray">
                          <i className="fa-solid fa-mobile-screen"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="PhoneNumber"
                          {...register("phoneNumber", {
                            required: "phoneNumber  is requird",
                          })}
                        />
                      </div>
                      <div>
                        {errors.phoneNumber && (
                          <pan className="text-danger">
                            {errors.phoneNumber.message}
                          </pan>
                        )}
                      </div>
                    </div>
                    <div className=" col-md-6  mb-2">
                      <div className="input-group mb-1 ">
                        <span className="input-group-text border-0 bg-gray">
                        <i className="fa-solid fa-earth-americas"></i>
                                                </span>
                        <input
                          type="text"
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="country"
                          {...register("country", {
                            required: "country  is requird",
                          })}
                        />
                      </div>
                      <div>
                        {errors.country && (
                          <pan className="text-danger">
                            {errors.country.message}
                          </pan>
                        )}
                      </div>
                    </div>

                    <div className=" col-md-6  mb-2">
                      <div className="input-group mb-1 ">
                        <span className="input-group-text border-0 bg-gray">
                          <i className="fa-solid fa-unlock-keyhole"></i>
                        </span>
                        <input
                          type={isPaswordVisble ? "text" : "password"}
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="Password"
                          {...register("password", {
                            required: "password is requird",
                          })}
                        />
                        <button
                          onClick={() => {
                            setIsPaswordVisble((prev) => !prev);
                          }}
                          onMouseUp={(e) => {
                            e.preventDefault();
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          type="button"
                          className="input-group-text border-0 bg-gray"
                        >
                          <i className="fa-solid fa-eye-slash"></i>
                        </button>
                      </div>
                      <div>
                        {errors.password && (
                          <pan className="text-danger">
                            {errors.password.message}
                          </pan>
                        )}
                      </div>
                    </div>

                    <div className=" col-md-6  mb-2">
                      <div className="input-group mb-1 ">
                        <span className="input-group-text border-0 bg-gray">
                          <i className="fa-solid fa-unlock-keyhole"></i>
                        </span>
                        <input
                          type={!isConfPaswordVisble? "password":"text"}
                          className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                          placeholder="confirm-Password"
                          {...register("confirmPassword", {
                            required: "confirm Password  is requird",
                          })}
                        />
                        <button
                          onClick={() => {
                            setIsConfPaswordVisble((prev) => !prev);
                          }}
                          onMouseUp={(e) => {
                            e.preventDefault();
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          type="button"
                          className="input-group-text border-0 bg-gray"
                        >
                          <i className="fa-solid fa-eye-slash"></i>
                        </button>
                      </div>

                      <div>
                        {errors.confirmPassword && (
                          <pan className="text-danger">
                            {errors.confirmPassword.message}
                          </pan>
                        )}
                      </div>
                    </div>

                    <div className="mb-0 col-md-12">
                      <div className="upload-btn-wrapper">
                        <input
                          type="file"
                          id="profileImage"
                          {...register("profileImage")}
                          className="form-control file "
                          onChange={handleChange}
                        />
                        <button className="btn form-control">

                          Choose a Item Image to Upload
                        </button>
                      </div>
                    </div>

                    <div className="mb-1 col-md-6">
                      <img
                        className="uploadimg mt-2 rounded-2"
                        width="60"
                        src={file}
                      />
                    </div>
                  </div>

                  <div className="w-100 text-end">
                    <Link
                      className="fs-6 text-decoration-none text-success"
                      to="/login"
                    >
                      Login Now?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      disabled={isSubmitting}
                      className="btn btn-success  w-50 my-3"
                    >
                      {isSubmitting ? "sending ...." : "Registration"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
