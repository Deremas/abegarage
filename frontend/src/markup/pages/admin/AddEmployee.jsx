import React from "react";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function AddEmployee() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="admin-left-side col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
