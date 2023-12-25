import { Navigate } from "react-router-dom";

import React from "react";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("token");
  if (token) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
