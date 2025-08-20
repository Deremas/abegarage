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

// Import the page components here
import Home from "./markup/pages/Home";
import About from "./markup/pages/About";
import Login from "./markup/pages/Login";
//Import the Orders and Customers component
import Customers from "./markup/pages/admin/Customers";

import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";

//Import the employees component
import Employees from "./markup/pages/admin/Employees";
//Import the EditEmployee component
import EditEmployee from "./markup/pages/admin/EditEmployee";
//Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRouth";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import CustomerDetail from "./markup/pages/admin/CustomerDetail";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import Service from "./markup/pages/admin/Service";
import AddNewOrder from "./markup/pages/admin/AddNewOrder";
import Admin from "./markup/pages/admin/Admin";
import EditOrder from "./markup/pages/admin/EditOrder";
import Orders from "./markup/pages/admin/Orders";
import Services from "./markup/pages/Services";
import TrackOrder from "./markup/pages/TrackOrder";
import Contact from "./markup/pages/Contact";
import PublicRoute from "./Context/PublicRoute ";
import NotFound from "./markup/pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Add the Orders Route */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={["Employee", "Manager", "Admin"]}>
              <Admin />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={["Employee", "Manager", "Admin"]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <AddNewOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={["Employee", "Manager", "Admin"]}>
              <Service />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-detail/:id"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <CustomerDetail />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-customer/:id"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-order/:id"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <EditOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-order" element={<TrackOrder />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Admin routes */}
        {/* <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={["Employee", "Manager", "Admin"]}>
              <Orders />
            </PrivateAuthRoute>
          }
        /> */}
        {/* <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={["Manager", "Admin"]}>
              <Customers />
            </PrivateAuthRoute>
          }
        /> */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={["Admin", "Manager"]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={["Admin"]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-employee/:id"
          element={
            <PrivateAuthRoute roles={["Admin"]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
