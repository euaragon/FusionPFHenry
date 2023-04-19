import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectLogin({ children }) {
  const loginUser = useSelector((state) => state.loginUser);

  if (loginUser.state === "Blocked" ) {
    return <Navigate to="/user-blocked" />;
  }

  return <div>{children}</div>;
}
