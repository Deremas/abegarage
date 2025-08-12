import React from "react";

// Imort the necessary components and hooks
import { useAuth } from "../../../Context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";

const Employees = () => {
  // Destructure the Auth hook
  const { isLogged, isAdmin } = useAuth();
  // Check if the user is logged in and is an admin
  if (  isLogged) {
    if (isAdmin) {
      return <div>Employees Page</div>;
    } else {
      return <div>You are not authorized to view this page.</div>;
    }
  } else {
    return <LoginForm />;
  }
};

export default Employees;
