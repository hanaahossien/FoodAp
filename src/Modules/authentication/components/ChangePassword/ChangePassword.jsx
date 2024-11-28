/* eslint-disable react/react-in-jsx-scope */
import { useForm } from "react-hook-form";
import logo from "../../../../assets/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useSyncExternalStore } from "react";

export default function ChangePassword() {
  const [isPaswordVisble, setIsPaswordVisble] = useState(false);
  const [isnewPassword, setIsnewPassword] = useState(false);
  const [isconfirmNewPassword, setIsconfirmNewPassword] = useState(false);

  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let onsubmite = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log(data);
      toast.success(response.data.message);
      navigate("/Login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-conatiner ">
        <div className="container-fluid overlay-auth">
          <div className="row vh-100 justify-content-around align-items-center">
            <div className="col-md-5 col-sm-8 col-8 bg-white rounded rounded-2 px-5 py-4  ">
              <div className="text-center">
                <img src={logo} alt="" className="img-fluid w-70" />
              </div>
              <div className="py-4">
                <div className="my-3">
                  <h3 className="h5"> change Password</h3>
                </div>

                <form onSubmit={handleSubmit(onsubmite)}>
                  <div className="my-2">
                    <div className="input-group mb-1 ">
                      <span
                        className="input-group-text border-0 bg-gray"
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-unlock-keyhole"></i>
                      </span>
                      <input
                        type={isPaswordVisble ? "text" : "password"}
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder=" oldPassword"
                        {...register("oldPassword", {
                          required: "This field is required",
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
                        <i
                          className={
                            !isPaswordVisble
                              ? "fa-solid   fa-eye-slash"
                              : "fa-solid  fa-eye"
                          }
                        ></i>{" "}
                      </button>
                    </div>

                    <div className="text-danger mt-2">
                      {errors.oldPassword && (
                        <p>{errors.oldPassword.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="input-group mb-1 ">
                      <span
                        className="input-group-text border-0 bg-gray"
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-unlock-keyhole"></i>
                      </span>
                      <input
                        type={isnewPassword ? "text" : "password"}
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder=" New Password"
                        {...register("newPassword", {
                          required: "This field is required",
                        })}
                      />
                      <button
                        onClick={() => {
                          setIsnewPassword((prev) => !prev);
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
                        <i
                          className={
                            !isnewPassword
                              ? "fa-solid   fa-eye-slash"
                              : "fa-solid  fa-eye"
                          }
                        ></i>{" "}
                      </button>
                    </div>

                    <div className="text-danger mt-2">
                      {errors.newPassword && (
                        <p>{errors.newPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="input-group mb-1 ">
                      <span
                        className="input-group-text border-0 bg-gray"
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-unlock-keyhole"></i>
                      </span>
                      <input
                        type={isconfirmNewPassword ? "text" : "password"}
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder="  Confirm New Password"
                        {...register("confirmNewPassword", {
                          required: "This field is required",
                        })}
                      />
                      <button
                        onClick={() => {
                          setIsconfirmNewPassword((prev) => !prev);
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
                        <i
                          className={
                            !isconfirmNewPassword
                              ? "fa-solid   fa-eye-slash"
                              : "fa-solid  fa-eye"
                          }
                        ></i>
                      </button>
                    </div>
                    <div className="text-danger mt-2">
                      {errors.confirmNewPassword && (
                        <p>{errors.confirmNewPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <button className="btn btn-success  w-100 my-3">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
