// Import the API URL from environment variables
// const api_url = process.env.VITE_APPP_API_URL;
const api_url = import.meta.env.VITE_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${loggedInEmployeeToken}`,
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// Export all functions
const employeeService = {
  createEmployee,
};
export default employeeService;
