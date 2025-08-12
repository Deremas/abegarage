// Import the API URL from environment variables
const api_url = import.meta.env.VITE_APP_API_URL;

// Function to send POST request for login
const logIn = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const url = `${api_url}/api/employee/login`;
  console.log("About to send request to:", url);
  console.log(requestOptions.body);

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // ✅ Parse here
    console.log("Parsed API Data:", data);

    return data; // ✅ Return parsed JSON
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};

// Function to log out the user
const logOut = () => {
  localStorage.removeItem("employee");
  window.location.replace("/login");
};
// Export the service
const loginService = {
  logIn,
  logOut,
};

export default loginService;
