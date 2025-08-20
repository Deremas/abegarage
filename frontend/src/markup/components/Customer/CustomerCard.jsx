import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";

const CustomerCard = ({ customer_id, onEdit }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/customers/${customer_id}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setCustomer(data.customer || null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [customer_id]);

  if (loading) return <div className="text-center py-5 text-secondary fw-semibold">Loading...</div>;
  if (error) return <div className="text-center py-3 text-danger fw-semibold">{error}</div>;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-3 align-items-center p-3">
        <div className="col-md-auto d-none d-md-flex align-items-center justify-content-center bg-danger text-white rounded-circle" style={{ width: '6rem', height: '6rem', fontWeight: '600', fontSize: '1.25rem' }}>
          Info
        </div>

        {customer ? (
          <div className="col">
            <h3 className="text-primary fw-bold mb-2">
              {customer.customer_first_name} {customer.customer_last_name}
            </h3>

            <p className="mb-1 fw-semibold text-primary">
              Email: <span className="text-secondary">{customer.customer_email}</span>
            </p>

            <p className="mb-1 fw-semibold text-primary">
              Phone: <span className="text-secondary">{customer.customer_phone_number}</span>
            </p>

            <p className="fw-semibold text-primary">
              Active: <span className="text-secondary">{customer.is_active ? "Yes" : "No"}</span>
            </p>

            {onEdit && (
              <div className="d-flex align-items-center gap-2 mt-3">
                <p className="mb-0 fw-semibold text-primary">Edit info:</p>
                <FaUserEdit
                  className="text-primary fs-3 cursor-pointer"
                  onClick={() => onEdit(customer_id)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="col">
            <p className="border border-secondary text-danger text-center p-3 fw-semibold">
              No customer found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;