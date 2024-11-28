/* eslint-disable react/react-in-jsx-scope */
import { useForm } from "react-hook-form";
import logo from "../../../../assets/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {

  let navigate=useNavigate()
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let onsubmite =async (data) => {
    try {
      let response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
      console.log(data)
      toast.success(response.data.message)
      navigate('/Login')

    } catch (error) {
toast.error(error.response.data.message)
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
                  <h3 className="h5"> Reset Password</h3>
                  <span className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </span>
                </div>

                <form onSubmit={handleSubmit(onsubmite)}>
                  <div className="my-2">
                    <div className="input-group mb-1 ">
                      <span
                        className="input-group-text border-0 bg-gray"
                        id="basic-addon1"
                      >
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        type="emaill"
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder="Email"
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
                    <div className="text-danger mt-2">{errors.email && <p>{errors.email.message}</p>}</div>

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
                        type="text"
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder="otp"
                        {...register("seed",{required:("This field is required")})}
                        />
                      </div>
                      <div className="text-danger mt-2">{errors.seed && <p>{errors.seed.message}</p>}</div>

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
                        type="password"
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder=" New Password"
                        {...register("password",{required:("This field is required")})}
                        />
                      </div>

                      <div className="text-danger mt-2">{errors.password && <p>{errors.password.message}</p>}</div>

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
                        type="password"
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder="  Confirm New Password"
                        {...register("confirmPassword",{required:("This field is required")})}
                        />
                      </div>
                      <div className="text-danger mt-2">{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}</div>

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
