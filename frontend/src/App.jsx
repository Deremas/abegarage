import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import custom css files
import "./assets/styles/custom.css";

// Import the Header and Footer components
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRouth";

// Import the page components here
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";

// Import admin pages
import Employees from "./markup/pages/admin/Employees";
import Customers from "./markup/pages/admin/Customers";
import Orders from "./markup/pages/admin/Orders";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin routes */}
        {/* <Route path="/admin/employees" element={<Employees />} /> */}
        {/* <Route path="/admin/orders" element={<Orders />} /> */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={["Employee", "Manager", "Admin"]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* <Route path="/admin/customers" element={<Customers />} /> */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/employees" element={
          <PrivateAuthRoute roles={["Admin", "manager"]}>
            <Employees />
          </PrivateAuthRoute>
          } />

        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={["admin"]}>
            <AddEmployee />
             </PrivateAuthRoute>
          }
        />
        {/* 
          Customers (/admin/customers) - managers and admins
          orders (/admin/orders) - can be accessed by all employees
          Add employee (/admin/add-employee) - only admins
          */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
