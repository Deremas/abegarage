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
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
