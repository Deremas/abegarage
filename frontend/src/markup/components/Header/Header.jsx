import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import loginServices from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logOut = () => {
    loginServices.logOut();
    setIsLogged(false);
    setIsNavOpen(false); // Close menu on logout
  };

  return (
    <header className="main-header header-style-one">
      {/* Header Top */}
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text">Enjoy the Beso while we fix your car</div>
              <div className="office-hour">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="right-column">
              {isLogged && (
                <div style={{ marginRight: "20px" }} className="phone-number">
                  <BsPersonCircle size={40} />
                  <strong style={{ marginLeft: "5px" }}>
                    {employee?.employee_first_name}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Upper */}
      <div className="header-upper">
        <div className="auto-container">
          <div className="inner-container d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsNavOpen(!isNavOpen)}
                aria-controls="navbarNav"
                aria-expanded={isNavOpen ? "true" : "false"}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`collapse navbar-collapse ${
                  isNavOpen ? "show" : ""
                }`}
                id="navbarNav"
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/my-order"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Track Your Order
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/about"
                      onClick={() => setIsNavOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/services"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Services
                    </Link>
                  </li>
                  {isLogged && (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/admin"
                        onClick={() => setIsNavOpen(false)}
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/contact"
                      onClick={() => setIsNavOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  {/* Mobile-only Login/Logout Button */}
                  <li className="nav-item d-lg-none">
                    {isLogged ? (
                      <Link
                        className="nav-link btn-login"
                        to="/"
                        onClick={logOut}
                      >
                        Logout
                      </Link>
                    ) : (
                      <Link
                        className="nav-link btn-login"
                        to="/login"
                        onClick={() => setIsNavOpen(false)}
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </nav>

            {/* Desktop-only Login/Logout Button */}
            <div className="link-btn d-none d-lg-block">
              {isLogged ? (
                <Link
                  to="/"
                  className="theme-btn btn-style-one"
                  onClick={logOut}
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login" className="theme-btn btn-style-one">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

// // import the logo image
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import logo from "../../../assets/images/logo.png";
// import { useAuth } from "../../../Context/AuthContext";
// import loginService from "../../../services/login.service";

// function Header() {
//   // console.log(useAuth());
//   // Access data from AuthContext
//   const { isLogged, setIsLogged, employee } = useAuth();

//   // Debug logging
//   console.log('Header - isLogged:', isLogged);
//   console.log('Header - employee:', employee);

//   // State for sticky header
//   const [isSticky, setIsSticky] = useState(false);

//   // Handle sticky header on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       if (scrollTop > 100) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Log out event handler fuction
//   const handleLogout = () => {
//     loginService.logOut();
//     // Set the logged-in state to false
//     setIsLogged(false);
//     // window.location.reload();
//   };

//   return (
//     <div>
//       <header className={`main-header header-style-one ${isSticky ? 'fixed-header' : ''}`}>
//         <div className="header-top">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="left-column">
//                 <div className="text">Enjoy the Beso while we fix your car</div>
//                 <div className="office-hour">
//                   Monday - Saturday 7:00AM - 6:00PM
//                 </div>

//                 {/* <strong>Welcome {employee?.employee_first_name}</strong> */}
//               </div>

//               <div className="right-column">
//                 {isLogged ? (
//                   <div className="phone-number" style={{ color: 'red', fontSize: '16px' }}>
//                     <strong>Welcome {employee?.employee_first_name}</strong>
//                     {/* Debug info */}
//                     <div style={{ fontSize: '12px', color: 'red' }}>
//                       Debug: isLogged={isLogged.toString()}, employee={employee ? 'exists' : 'null'}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="phone-number">
//                     Schedule Your Appointment: <strong>1800 456 7890</strong>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//     <div className="header-upper">
//   <div className="auto-container">
//     <div
//       className="inner-container"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between", // space out logo, nav, and button
//         padding: "15px 0",
//         minHeight: "80px",
//         width: "100%",
//       }}
//     >
//       {/* Logo */}
//       <div className="logo-box" style={{ flexShrink: 0 }}>
//         <div className="logo">
//           <Link to="/">
//             <img src={logo} alt="Logo" style={{ height: "50px" }} />
//           </Link>
//         </div>
//       </div>

//       {/* Navigation menu */}
//       <nav
//         className="main-menu navbar-expand-md navbar-light"
//         style={{ flex: 1, marginLeft: "50px" }}
//       >
//         <ul
//           className="navigation"
//           style={{
//             display: "flex",
//             listStyle: "none",
//             margin: 0,
//             padding: 0,
//             gap: "1.5rem",
//             alignItems: "center",
//           }}
//         >
//           <li>
//             <Link
//               to="/"
//               style={{
//                 color: "black",
//                 textDecoration: "none",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               style={{
//                 color: "black",
//                 textDecoration: "none",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//             >
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               style={{
//                 color: "black",
//                 textDecoration: "none",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               style={{
//                 color: "black",
//                 textDecoration: "none",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Login / Logout button */}
//       <div className="auth-btn">
//         {isLogged ? (
//           <Link
//             to="/"
//             onClick={handleLogout}
//             style={{
//               color: "white",
//               background: "red",
//               padding: ".5rem 1rem",
//               textDecoration: "none",
//               fontSize: "16px",
//               fontWeight: "500",
//               borderRadius: "6px",
//             }}
//           >
//             Log out
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             style={{
//               color: "black",
//               textDecoration: "none",
//               fontSize: "16px",
//               fontWeight: "500",
//             }}
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

//         <div className="sticky-header">
//           <div className="header-upper">
//             <div className="auto-container">
//               <div className="inner-container" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//               }}>
//                 <div className="logo-box">
//                   <div className="logo">
//                     <Link to="/">
//                       <img src={logo} alt="" />
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="right-column" style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '20px'
//                 }}>
//                   <div className="nav-outer">
//                     <div className="mobile-nav-toggler">
//                       <img src="assets/images/icons/icon-bar.png" alt="" />
//                     </div>

//                     <nav className="main-menu navbar-expand-md navbar-light">
//                       <div
//                         className="collapse navbar-collapse show clearfix"
//                         id="navbarSupportedContent"
//                       >
//                         <ul className="navigation" style={{
//                           display: 'flex',
//                           listStyle: 'none',
//                           margin: 0,
//                           padding: 0,
//                           gap: '30px'
//                         }}>
//                           <li className="dropdown">
//                             <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link>
//                           </li>
//                           <li className="dropdown">
//                             <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}>About Us</Link>
//                           </li>
//                           <li className="dropdown">
//                             <Link to="/services" style={{ color: 'black', textDecoration: 'none' }}>Services</Link>
//                           </li>
//                           <li>
//                             <Link to="/contact" style={{ color: 'black', textDecoration: 'none' }}>Contact Us</Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </nav>
//                   </div>
//                   <div className="search-btn"></div>
//                   {isLogged ? (
//                     <div className="link-btn">
//                       <Link
//                         to="/"
//                         className="theme-btn btn-style-one"
//                         onClick={handleLogout}
//                       >
//                         Log out
//                       </Link>
//                     </div>
//                   ) : (
//                     <div className="link-btn">
//                       <Link to="/login" className="theme-btn btn-style-one">
//                         Login
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mobile-menu">
//           <div className="menu-backdrop"></div>
//           <div className="close-btn">
//             <span className="icon flaticon-remove"></span>
//           </div>

//           <nav className="menu-box">
//             <div className="nav-logo">
//               <a href="index.html">
//                 <img src="assets/images/logo-two.png" alt="" title="" />
//               </a>
//             </div>
//             <div className="menu-outer"></div>
//           </nav>
//         </div>

//         <div className="nav-overlay">
//           <div className="cursor"></div>
//           <div className="cursor-follower"></div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;
