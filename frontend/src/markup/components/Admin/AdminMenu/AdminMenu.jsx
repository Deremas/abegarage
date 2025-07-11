import React from "react";

function AdminMenu() {
  return (
    <div>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <a href="/admin" className="list-group-item">
          Dashboard
        </a>
        <a href="/admin/orders" className="list-group-item">
          Orders
        </a>
        <a href="/admin/order" className="list-group-item">
          New order
        </a>
        <a href="/admin/add-empoyee" className="list-group-item">
          Add employee
        </a>
        <a
          href="/admin/employees"
          className="list-group-item list-group-item-action"
        >
          Employees
        </a>
        <a
          href="/admin/add-customer"
          className="list-group-item list-group-item-action"
        >
          Add Customer
        </a>
        <a
          href="/admin/customers"
          className="list-group-item list-group-item-action"
        >
          Customers
        </a>
        <a
          href="/admin/services"
          className="list-group-item list-group-item-action"
        >
          Services
        </a>
      </div>
    </div>
  );
}

export default AdminMenu;
