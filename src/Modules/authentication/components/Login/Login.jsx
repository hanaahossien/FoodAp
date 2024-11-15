import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({saveloginData}) {
  // hana88
  // hanaa.hossien88@gmail.com
  // @Password32!

  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let onSubmite = async (data) => {
    try {
      let req = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );

      localStorage.setItem("token", req.data.token)
      saveloginData()
      toast.success(req.data.message);


      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    // "email": "nadia.mohamed.taha166@gmail.com",
    // "password": "@Password321!"



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
                  <h3 className="h5">Log In</h3>
                  <span className="text-muted">
                    Welcome Back! Please enter your details
                  </span>
                </div>
                <form onSubmit={handleSubmit(onSubmite)}>
                  <div className="  mb-1">
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
                  <div className="mb-1">
                    <div className="input-group mb-1 ">
                      <span className="input-group-text border-0 bg-gray">
                        <i className="fa-solid fa-mobile-screen"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control border-top-0  bg-gray border-bottom-0  border-end-0"
                        placeholder="Password"
                        {...register("password", {
                          required: "password is requird",
                        })}
                      />
                    </div>
                    <div>
                      {errors.password && (
                        <pan className="text-danger">
                          {errors.password.message}
                        </pan>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link
                      className="fs-6 text-decoration-none text-black"
                      to="/Reset-Password"
                    >
                      Register Now?
                    </Link>
                    <Link
                      className="fs-6 text-decoration-none text-success"
                      to="/Forget-Password"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <button className="btn btn-success  w-100 my-3">
                    
                    Login
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
