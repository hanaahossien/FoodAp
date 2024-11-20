import axios from "axios";
import logo from "../../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {

  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

let navigate=useNavigate()

  let x = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success(response.data.message);

      navigate('/Reset-Password')
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
                  <h3 className="h5">Forgot Your Password?</h3>
                  <span className="text-muted">
                    No worries! Please enter your email and we will send a
                    password reset link
                  </span>
                </div>

                <form onSubmit={handleSubmit(x)}>
                  <div className="my-5">
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
                        })}
                      />
                    </div>

                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>

                  <button className="btn btn-success  w-100 my-3">
                    Submit
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
