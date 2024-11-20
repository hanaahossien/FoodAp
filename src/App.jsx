import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Modules/shared/components/AuthLayout/AuthLayout";
import ForgetPass from "./Modules/authentication/components/ForgetPass/ForgetPass";
import Login from "./Modules/authentication/components/Login/Login";
import Registration from "./Modules/authentication/components/Registration/Registration";
import ResetPass from "./Modules/authentication/components/ResetPass/ResetPass";
import RecipeList from "./Modules/recipe/components/RecipeList/RecipeList";
import CategoriesList from "./Modules/categories/components/CategoriesList/CategoriesList";
import CategoriesData from "./Modules/categories/components/CategoriesData/CategoriesData";
import RecipeData from "./Modules/recipe/components/RecipeData/RecipeData";
import MasteraLayout from "./Modules/shared/components/MasteraLayout/MasteraLayout";
import DashBoard from "./Modules/dashBoard/components/DashBoard/DashBoard";
import User from "./Modules/user/component/User/User";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ProtectedRout from "./Modules/shared/components/ProtectedRout/ProtectedRout";
import RecipeForm from "./Modules/recipe/components/RecipeForm/RecipeForm";
import VerifyAccount from "./Modules/authentication/components/VerifyAccount/VerifyAccount";

export default function App() {
  const [loginData, setLoginData] = useState("null");

  let saveloginData = () => {
    let dectoken = localStorage.getItem("token");
    let enctoken = jwtDecode(dectoken);
    setLoginData(enctoken);
    console.log(enctoken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveloginData();
    }
  }, []);
  const routers = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login saveloginData={saveloginData} />,
        },
        {
          path: "Forget-Password",
          element: <ForgetPass />,
        },
        {
          path: "Login",
          element: <Login saveloginData={saveloginData} />,
        },
        {
          path: "Registration",
          element: <Registration />,
        },
        {
          path: "Reset-Password",
          element: <ResetPass />,
        },
        { path: "verify-account", element: <VerifyAccount /> }

      ],
    },
    {
      path: "DashBoard",
      element: (
        <ProtectedRout saveloginData={saveloginData}>
          {" "}
          <MasteraLayout loginData={loginData} />{" "}
        </ProtectedRout>
      ),
      children: [
        {
          index: true,
          element: <DashBoard loginData={loginData} />,
        },
        {
          path: "Categories-List",
          element: <CategoriesList />,
        },
        { path: "Recipe-List/Registration", element: <Registration /> },

        {
          path: "Recipe-List/new-recipe",
          element: <RecipeForm />,
        },
        {
          path: "Recipe-List/:recipeId",
          element: <RecipeForm />,
        },
        {
          path: "Categories-Data",
          element: <CategoriesData saveloginData={saveloginData} />,
        },
        {
          path: "Recipe-List",
          element: <RecipeList />,
        },
        {
          path: "Recipe-Data",
          element: <RecipeData />,
        },
        {
          path: "User",
          element: <User />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <div>
        <RouterProvider router={routers}></RouterProvider>
      </div>
    </>
  );
}
