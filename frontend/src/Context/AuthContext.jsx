// Context/AuthContext.jsx
import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../utils/Auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // ✅ add this

  useEffect(() => {
    try {
      const user = getAuth();
      if (user?.employee_token) {
        setIsLogged(true);
        setEmployee(user);
        if (user.employee_role === "Admin") setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error retrieving employee data:", error);
    } finally {
      setIsChecked(true); // ✅ mark check complete
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        employee,
        setEmployee,
        isAdmin,
        setIsAdmin,
        isChecked, // ✅ expose it
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import { useState, useEffect, useContext, createContext } from "react";
// import getAuth from "../utils/Auth";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [employee, setEmployee] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const value = {
//     isLogged,
//     setIsLogged,
//     employee,
//     setEmployee,
//     isAdmin,
//     setIsAdmin,
//   };

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         const loggedInEmployee = getAuth();
//         // if getAuth() is synchronous and returns data directly, remove await
//         const response = await loggedInEmployee;
//         console.log(response);

//         if (response?.employee_token) {
//           setIsLogged(true);
//           if (response.employee_role === "Admin") {
//             setIsAdmin(true);
//           }
//           setEmployee(response);
//         }
//       } catch (error) {
//         console.error("Error retrieving employee data:", error);
//       }
//     };
//     fetchAuth();
//   }, []);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import { useState, useEffect, useContext, createContext } from "react";
// // Import the Util function we created to handle authentication
// import getAuth from "../utils/Auth";

// // create the AuthContext
// const AuthContext = createContext();

// // Create a custom hook to use the context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // Create the AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [employee, setEmployee] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const vaue = {
//     isLogged,
//     setIsLogged,
//     employee,
//     setEmployee,
//     isAdmin,
//     setIsAdmin,
//   };

//   useEffect(async () => {
//     // Retrieve the logged in user from local storage
//     const loggedInEmployee = getAuth();
//     console.log(loggedInEmployee);

//     try {
//       const response = await loggedInEmployee;
//       console.log(response);
//       if (response.employee_token) {
//         setIsLogged(true);
//         // 3 is the employee_role for admin
//         if (response.employee_role) {
//           setIsAdmin(true);
//         }
//         setEmployee(response);
//       }
//     } catch (error) {
//       console.error("Error retrieving employee data:", error);
//     }
//   }, []);

//   return <AuthContext.Provider value={vaue}>{children}</AuthContext.Provider>;
// };
