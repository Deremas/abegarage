// utils/getAuth.js
const getAuth = () => {
  const employee = JSON.parse(localStorage.getItem("employee"));
  if (employee?.employee_token) {
    const decodedToken = decodeTokenPayload(employee.employee_token);
    return {
      ...employee,
      employee_id: decodedToken.employee_id,
      employee_role: decodedToken.employee_role,
      employee_first_name: decodedToken.employee_first_name,
      employee_role_id: decodedToken.employee_role_id,
    };
  }
  return null;
};

// Decode JWT payload without verification
const decodeTokenPayload = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;

// // Function to read data from local storage
// const getAuth = async () => {
//   const employee = await JSON.parse(localStorage.getItem("employee"));
//   if (employee && employee.employee_token) {
//     const decodedToken = await decodeTokenPayload(employee.employee_token);

//     employee.employee_id = decodedToken.employee_id;
//     employee.employee_role = decodedToken.employee_role;
//     employee.employee_first_name = decodedToken.employee_first_name;
//     employee.employee_role_id = decodedToken.employee_role_id;

//     return employee;
//   } else {
//     return null;
//   }
// };

// // Function to decode the payload from the token
// // The purpose of this function is to decode the JWT token and extract the payload
// // It is used to get user information from the token without needing to verify it
// const decodeTokenPayload = (token) => {
//   if (!token) return null;
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
//       .join("")
//   );
//   return JSON.parse(jsonPayload);
// };

// export default getAuth;
