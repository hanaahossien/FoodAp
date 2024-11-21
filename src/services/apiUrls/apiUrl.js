import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006/api/v1/";

export const axiosInstance =axios.create({baseURL:baseUrl,headers:
    { headers: { Authorization: localStorage.getItem("token") } }

})

// registeration

export const users = {
  createUser: "Users/Register",
  verifyUser:"Users/verify"
};
