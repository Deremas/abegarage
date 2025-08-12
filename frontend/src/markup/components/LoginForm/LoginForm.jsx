import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginService from "../../../services/login.service";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  // Client-side validations
  let valid = true;

  if (!employee_email) {
    setEmailError("Please enter your email address");
    valid = false;
  } else if (!employee_email.includes("@")) {
    setEmailError("Please enter a valid email address");
    valid = false;
  } else {
    setEmailError("");
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

  if (!valid) return;

  const formData = { employee_email, employee_password };
  console.log("Submitting:", formData);

try {
  const response = await loginService.logIn(formData);
  console.log("API Raw Response:", response);

  if (response.status === "success") {
    if (response.data?.employee_token) {
      localStorage.setItem("employee", JSON.stringify(response.data));
    }
    if (location.pathname === "/login") {
      window.location.replace("/");
    } else {
      window.location.reload();
    }
  } else {
    setServerError(response.message || "Login failed");
  }
} catch (error) {
  console.error("Login API Error:", error);
  setServerError("An error occurred while logging in. Please try again.");
}

};


  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="clearfix row">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
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
                        <span>Login</span>
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

export default LoginForm;
