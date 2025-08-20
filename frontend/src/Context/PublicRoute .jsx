import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import getAuth from "../utils/Auth";

const PublicRoute = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().then((user) => {
      if (user?.employee_token) setIsLoggedIn(true);
      setIsChecked(true); // mark check complete
    });
  }, []);

  if (!isChecked) return null; // or a loader while checking

  return isLoggedIn ? <Navigate to="/admin" replace /> : children;
};

export default PublicRoute;

// import { Navigate } from "react-router-dom";
// import getAuth from "../utils/Auth";

// const PublicRoute = ({ children }) => {
//   const isLoggedIn = getAuth(); // true if logged in
//   return isLoggedIn ? <Navigate to="/admin" /> : children;
// };

// export default PublicRoute
