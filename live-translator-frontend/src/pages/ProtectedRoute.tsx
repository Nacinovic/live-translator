import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { useSnackbar } from "../context/SnackBarContext";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { isAuthenticated, loggedInUserData } = useAuth() ?? {};
  const snackBar = useSnackbar();

  useEffect(() => {}, [isAuthenticated, loggedInUserData]);

  if (isAuthenticated === false) {
    snackBar?.showSnackBarError("Please login first");
    return <Navigate to={"/"} />;
  }

  if (loggedInUserData === null || isAuthenticated === null) {
    return <div>LOADING .....</div>;
  }

  return element;
}

export default ProtectedRoute;
