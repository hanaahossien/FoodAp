import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRout({ saveloginData, children }) {
  if (saveloginData || localStorage.getItem("token"))  return children;
   else return <Navigate to="/login" />;

}
