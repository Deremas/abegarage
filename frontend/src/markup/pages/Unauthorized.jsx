function Unauthorized() {
  return (
    <div
    // className="unauthorized-page"
    >
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      {/* <a href="/login">Go to Login</a> */}
      <p>
        Please contact your administrator for assistance or use correct
        credentials to log in that have access to this page.
      </p>
    </div>
  );
}

export default Unauthorized;
