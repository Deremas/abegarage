import { useState, useEffect } from "react";
// Import the route and navigate methods
import { Navigate, useNavigate } from "react-router-dom";
// Import the Util functions to handle the local storage
import getAuth from "../../../utils/Auth";

const PrivateAuthRoute = ({ children, roles }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        console.log(response);
        // here user is logged in
        setIsLogged(true);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          // Here user is logged in and authorised to access route
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);

  if (isChecked) {
    if (!isLogged) {
      // return <Navigate to="/login" />;
      navigate("/login");
    }
    if (!isAuthorized) {
      // return <Navigate to="/unauthorized" />;
      navigate("/unauthorized");
    }
  }
  return children;
};

export default PrivateAuthRoute;
