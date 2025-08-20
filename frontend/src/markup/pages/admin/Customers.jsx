import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomersList from "../../components/Admin/CustomersList/CustomersList";

function Customers() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <CustomersList />
        </div>
      </div>
    </div>
  );
}

export default Customers;



// import React, { useState } from "react";
// import { useGetcustomersByKeywordQuery, useGetCustomersQuery } from "@/features/api/apiSlice";
// import { HiSearch } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

// function CustomersPage() {
//   const navigate = useNavigate();
//   const [keyword, setKeyword] = useState("");
//   const [page, setPage] = useState(1);

//   const { data: customers, isLoading, isError, error } = useGetCustomersQuery({ page, limit: 10 });
//   const { data: searchCustomers, isLoading: isCustomerLoading, error: customerError } = useGetcustomersByKeywordQuery(
//     { keyword },
//     { skip: !keyword }
//   );

//   const handleNextPage = () => {
//     if ((customers?.customers ?? []).length > 0) setPage(page + 1);
//   };

//   const handlePreviousPage = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleSearchChange = (e) => setKeyword(e.target.value);

//   const displayedCustomers = keyword ? searchCustomers?.customers : customers?.customers;
//   const isLoadingCustomers = keyword ? isCustomerLoading : isLoading;
//   const isErrorCustomers = keyword ? customerError : isError;

//   return (
//     <div className="container my-5">
//       <h1 className="mb-4 text-primary fw-bold">
//         Customers
//         <span className="d-inline-block ms-2" style={{ width: '40px', height: '2px', backgroundColor: 'red' }}></span>
//       </h1>

//       <div className="mb-4 position-relative">
//         <input
//           type="text"
//           className="form-control pe-5"
//           placeholder="Search by first name, last name, or email"
//           value={keyword}
//           onChange={handleSearchChange}
//         />
//         <HiSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
//       </div>

//       {isLoadingCustomers && <p className="text-center text-secondary fw-semibold">Loading...</p>}
//       {isErrorCustomers && <p className="text-center text-danger fw-semibold">Error fetching customers</p>}

//       {displayedCustomers && displayedCustomers.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>ID</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Added Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedCustomers.map((customer, index) => (
//                 <tr
//                   key={customer.customer_id}
//                   onClick={() => navigate(`/customers/${customer.customer_id}`)}
//                   className="cursor-pointer"
//                   style={{ backgroundColor: index % 2 ? '#f8f9fa' : 'white' }}
//                 >
//                   <td>{customer.customer_id}</td>
//                   <td>{customer.customer_first_name}</td>
//                   <td>{customer.customer_last_name}</td>
//                   <td>{customer.customer_email}</td>
//                   <td>{customer.customer_phone_number}</td>
//                   <td>{new Date(customer.customer_added_date).toLocaleDateString()}</td>
//                   <td>{customer.active_customer_status ? "Active" : "Inactive"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-primary fw-semibold">No customers found</p>
//       )}

//       <div className="d-flex justify-content-center mt-4">
//         <button className="btn btn-outline-primary me-2" onClick={handlePreviousPage}>
//           Previous Page
//         </button>
//         <button className="btn btn-outline-primary" onClick={handleNextPage}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CustomersPage;
