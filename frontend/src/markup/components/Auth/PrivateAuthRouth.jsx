// components/PrivateAuthRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

const PrivateAuthRoute = ({ children, roles }) => {
  // ✅ Refinement: Destructure the `isChecked` state from your AuthContext.
  const { isLogged, employee, isChecked } = useAuth();

  // ✅ Refinement: Wait for the authentication check to complete.
  // This prevents the component from rendering anything or redirecting prematurely.
  if (!isChecked) {
    return null; // or a loading spinner
  }

  // Once the check is complete, the rest of the logic can run.
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (roles?.length > 0 && !roles.includes(employee?.employee_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateAuthRoute;

// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import getAuth from "../../../utils/Auth";

// const PrivateAuthRoute = ({ children, roles }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     getAuth().then((user) => {
//       if (user?.employee_token) {
//         setIsLogged(true);
//         if (roles?.includes(user.employee_role)) {
//           setIsAuthorized(true);
//         }
//       }
//       setIsChecked(true);
//     });
//   }, [roles]);

//   if (!isChecked) {
//     // While checking, render nothing or a loader
//     return null;
//   }

//   if (!isLogged) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!isAuthorized) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default PrivateAuthRoute;

// import { useState, useEffect } from "react";
// // Import the route and navigate methods
// import { Navigate, useNavigate } from "react-router-dom";
// // Import the Util functions to handle the local storage
// import getAuth from "../../../utils/Auth";

// const PrivateAuthRoute = ({ children, roles }) => {
//   const navigate = useNavigate();
//   const [isChecked, setIsChecked] = useState(false);
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     // Retrieve the logged in user from local storage
//     const loggedInEmployee = getAuth();
//     console.log(loggedInEmployee);
//     loggedInEmployee.then((response) => {
//       if (response.employee_token) {
//         console.log(response);
//         // here user is logged in
//         setIsLogged(true);
//         if (
//           roles &&
//           roles.length > 0 &&
//           roles.includes(response.employee_role)
//         ) {
//           // Here user is logged in and authorised to access route
//           setIsAuthorized(true);
//         }
//       }
//       setIsChecked(true);
//     });
//   }, [roles]);

//   if (isChecked) {
//     if (!isLogged) {
//       // return <Navigate to="/login" />;
//       navigate("/login");
//     }
//     if (!isAuthorized) {
//       // return <Navigate to="/unauthorized" />;
//       navigate("/unauthorized");
//     }
//   }
//   return children;
// };

// export default PrivateAuthRoute;
