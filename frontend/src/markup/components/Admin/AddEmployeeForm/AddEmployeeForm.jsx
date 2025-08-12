import React, { useState } from "react";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  // Validation & status states
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Initialize navigate
  const navigate = useNavigate()

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const validateForm = () => {
    let valid = true;

    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employee_email)) {
        setEmailError("Email must be valid");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setServerError("");
  //   setSuccess(false);

  //   if (!validateForm()) return;

  //   const formData = {
  //     employee_email,
  //     employee_first_name,
  //     employee_last_name,
  //     employee_phone,
  //     employee_password,
  //     active_employee,
  //     company_role_id: Number(company_role_id), // Ensure this is a number
  //   };

  //   try {
  //     const response = await employeeService.createEmployee(
  //       formData,
  //       loggedInEmployeeToken
  //     );

  //     if (!response.ok) {
  //       // Handle HTTP errors
  //       const errorData = await response.json().catch(() => ({}));
  //       setServerError(errorData.error || "Failed to create employee.");
  //       return;
  //     }

  //     const data = await response.json();

  //     if (data.error) {
  //       setServerError(data.error);
  //       return;
  //     }

  //     // Optional: check if data confirms creation (e.g., id or success flag)
  //     if (data.id || data.success) {
  //       setSuccess(true);
  //       setServerError("");
  //       // Redirect after short delay
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 2000);
  //     } else {
  //       setServerError("Employee creation failed.");
  //     }
  //   } catch (error) {
  //     setServerError(error.message || "An unknown error occurred.");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError("");
  setSuccess(false);

  if (!validateForm()) return;

  const formData = {
    employee_email,
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_password,
    active_employee,
    company_role_id: Number(company_role_id), // Ensure this is a number
  };

  try {
    const response = await employeeService.createEmployee(
      formData,
      loggedInEmployeeToken
    );

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => ({}));
      setServerError(errorData.error || "Failed to create employee.");
      return;
    }

    const data = await response.json();
    console.log("Backend response:", data);

    if (data.error) {
      setServerError(data.error);
      return;
    }

    // Flexible success check based on likely backend responses
    if (
      data.id ||
      data.employeeId || // Added for common ID naming
      data.success === true || // explicit success boolean
      (data.message && data.message.toLowerCase().includes("success"))
    ) {
      setSuccess(true);
      setServerError("");
      // Redirect after short delay
      setTimeout(() => {
        // window.location.href = "/";
        navigate("/admin/employees");
      }, 2000);
    } else {
      setServerError("Employee creation failed.");
    }
  } catch (error) {
    setServerError(error.message || "An unknown error occurred.");
  }
};


  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add New Employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="clearfix row">
                    {serverError && (
                      <div className="validation-error" role="alert">
                        {serverError}
                      </div>
                    )}
                    {success && (
                      <div className="validation-success" role="alert">
                        Employee added successfully!
                      </div>
                    )}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee-email"
                        value={employee_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-first-name"
                        value={employee_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Employee First Name"
                        required
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-last-name"
                        value={employee_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Employee Last Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-phone"
                        value={employee_phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Employee Phone Number (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee-role"
                        value={company_role_id}
                        onChange={(e) => setCompany_role_id(e.target.value)}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee-password"
                        value={employee_password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add Employee</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;

// import React, { useState } from "react";
// // Import employee service to handle API requests
// import employeeService from "../../../../services/employee.service";
// // Import the necessary components and hooks
// import { useAuth } from "../../../../Context/AuthContext";

// function AddEmployeeForm() {
//   const [employee_email, setEmail] = useState("");
//   const [employee_first_name, setFirstName] = useState("");
//   const [employee_last_name, setLastName] = useState("");
//   const [employee_phone, setPhoneNumber] = useState("");
//   const [employee_password, setPassword] = useState("");
//   const [active_employee, setActive_employee] = useState(1);
//   const [company_role_id, setCompany_role_id] = useState(1);
//   // Errors
//   const [emailError, setEmailError] = useState("");
//   const [firstNameRequired, setFirstNameRequired] = useState("");
//   const [passwordEror, setPasswordError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [serverError, setServerError] = useState("");

//   // create a variable to hold the user's token
//   let loggedInEmployeeToken = "";
//   // Get the logged in employee token from the Auth context
//   const { employee } = useAuth();
//   if (employee && employee.employee_token) {
//     loggedInEmployeeToken = employee.employee_token;
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle client side validations
//     let valid = true; // Flag
//     // First name is required
//     if (!employee_first_name) {
//       setFirstNameRequired("First name is required");
//       valid = false;
//     } else {
//       setFirstNameRequired("");
//     }

//     // Email is required
//     if (!employee_email) {
//       setEmailError("Email is required");
//       valid = false;
//     } else if (!employee_email.includes("@")) {
//       setEmailError("Email must be valid");
//       valid = false;
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(employee_email)) {
//         setEmailError("Email must be valid");
//         valid = false;
//       } else {
//         setEmailError("");
//       }
//     }

//     // Password is required
//     if (!employee_password) {
//       setPasswordError("Password is required");
//       valid = false;
//     } else if (employee_password.length < 6) {
//       setPasswordError("Password must be at least 6 characters long");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     // If the form is not valid, return early
//     if (!valid) {
//       return;
//     }

//     const formData = {
//       employee_email,
//       employee_first_name,
//       employee_last_name,
//       employee_phone,
//       employee_password,
//       active_employee,
//       company_role_id,
//     };

//     // Pass the form data to the employee service to create a new employee
//     const newEmployee = employeeService.createEmployee(formData, loggedInEmployeeToken);
//     newEmployee
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data)
//         // If error is returned from API server, set the server error message
//         if (data.error) {
//           serverError(data.error || "Failed to create employee.");
//         } else {
//           // Handle success
//           setSuccess(true);
//           setServerError("");
//           // Redirect to the employees page after 2 seconds
//           // For now, just redirect to the home page
//           setTimeout(() => {
//             // window.location.href = "/admin/employees";
//             window.location.href = "/";
//           }, 2000);
//         }
//       })
//       // Handle any errors that occur during the API request
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         setServerError(resMessage);
//       });
//   };

//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Add New Employee</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="clearfix row">
//                     <div className="form-group col-md-12">
//                       {serverError && (
//                         <div className="validation-error" role="alert">
//                           {serverError}
//                         </div>
//                       )}
//                       <input
//                         type="email"
//                         name="employee-email"
//                         value={employee_email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                       />
//                       {emailError && (
//                         <div className="validation-error" role="alert">
//                           {emailError}
//                         </div>
//                       )}
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee-first-name"
//                         value={employee_first_name}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         placeholder="Employee First Name"
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee-last-name"
//                         value={employee_last_name}
//                         onChange={(e) => setLastName(e.target.value)}
//                         placeholder="Employee Last Name"
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee-phone"
//                         value={employee_phone}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="Employee Phone Number (555-555-5555)"
//                         required
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <select
//                         name="employee-role"
//                         value={company_role_id}
//                         onChange={(e) => setCompany_role_id(e.target.value)}
//                         className="custom-select-box"
//                         id=""
//                       >
//                         <option value="1">Employee</option>
//                         <option value="2">Manager</option>
//                         <option value="3">Admin</option>
//                       </select>
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="password"
//                         name="employee-password"
//                         value={employee_password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                       />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <button
//                         className="theme-btn btn-style-one"
//                         type="submit"
//                         data-loading-text="Please wait..."
//                       >
//                         <span>Add Employee</span>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AddEmployeeForm;
