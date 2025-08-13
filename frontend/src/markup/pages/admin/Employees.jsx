import React from "react";

// Imort the necessary components and hooks
import { useAuth } from "../../../Context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";

const Employees = () => {
  // Destructure the Auth hook
  const { isLogged, isAdmin } = useAuth();
  // Check if the user is logged in and is an admin
  if (isLogged) {
    if (isAdmin) {
      return (
        <>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EmployeesList/>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div>You are not authorized to view this page.</div>;
    }
  } else {
    return <LoginForm />;
  }
};

export default Employees;
