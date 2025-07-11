import React from "react";

function AddEmployeeForm() {
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
                <form action="">
                  <div className="clearfix row">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee-email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-first-name"
                        placeholder="Employee First Name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-last-name"
                        placeholder="Employee Last Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee-phone"
                        placeholder="Employee Phone Number (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee-role"
                        className="custom-select-box"
                        id=""
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
                        placeholder="Password"
                      />
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
