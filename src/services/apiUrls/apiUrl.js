import axios from "axios";

export const baseURL = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

// registeration

export const users = {
  createUser: "/Users/Register",
  verifyUser: "/Users/verify",
  getAllusers: (pageSize, pageNu,userName) =>
    `/Users/?pageSize=${pageSize}&pageNumber=${pageNu}&userName=${userName}`,
  deleteUser: (id) => `/Users/${id}`,

  getUserById :(id)=> `/Users/${id}`

};

//categor
export const category = {
  getAllCategory: (pageSize, pageNumber,name) =>
    `/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}`,
};
