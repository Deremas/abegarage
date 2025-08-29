// import React, { useState, useEffect } from "react";
// import { Button, Table } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCar,
//   faShoppingCart,
//   faUser,
//   faEdit,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import vehicleService from "../../../../services/vehicle.service";
// import orderService from "../../../../services/order.service";
// import { useNavigate, useLocation } from "react-router";
// import { useAuth } from "../../../../Context/AuthContext";
// import OrdersComponent from "../OrdersComponent/OrdersComponent";

// function CustomerDetailComponent() {
//   const [showVehicleForm, setShowVehicleForm] = useState(false);
//   const [vehicle_year, setVehicleYear] = useState("");
//   const [vehicle_make, setVehicleMake] = useState("");
//   const [vehicle_model, setVehicleModel] = useState("");
//   const [vehicle_type, setVehicleType] = useState("");
//   const [vehicle_mileage, setVehicleMileage] = useState("");
//   const [vehicle_tag, setVehicleTag] = useState("");
//   const [vehicle_serial, setVehicleSerial] = useState("");
//   const [vehicle_color, setVehicleColor] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [vehicleData, setVehicleData] = useState([]);
//   const [order, setOrders] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);

//   const location = useLocation();
//   const customerData =
//     location.state?.selectedCustomer || location.state?.customer || null;
//   const customer_id = customerData?.customer_id;
//   const { fromOrders } = location.state || {};
//   const navigate = useNavigate();
//   const { employee } = useAuth();
//   const loggedInEmployeeToken = employee?.employee_token || "";

//   // Fetch vehicles
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await vehicleService.getVehicle(
//           customer_id,
//           loggedInEmployeeToken
//         );
//         setVehicleData(response);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//         setVehicleData([]);
//       }
//     };
//     fetchVehicles();
//   }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

//   // Fetch orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await orderService.getCustomerOrders(
//           customer_id,
//           loggedInEmployeeToken
//         );
//         setOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setOrders([]);
//       }
//     };
//     fetchOrders();
//   }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

//   const handleEdit = () => {
//     navigate(`/admin/edit-customer/${customer_id}`, {
//       state: { customerData },
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const vehicleFormData = {
//       customer_id,
//       vehicle_year,
//       vehicle_make,
//       vehicle_model,
//       vehicle_type,
//       vehicle_mileage,
//       vehicle_tag,
//       vehicle_serial,
//       vehicle_color,
//     };

//     try {
//       await vehicleService.createVehicle(
//         vehicleFormData,
//         loggedInEmployeeToken
//       );
//       setSuccessMessage("Vehicle added successfully!");
//       // Clear form
//       setVehicleYear("");
//       setVehicleMake("");
//       setVehicleModel("");
//       setVehicleType("");
//       setVehicleMileage("");
//       setVehicleTag("");
//       setVehicleSerial("");
//       setVehicleColor("");
//       setRefreshTrigger((prev) => !prev);
//       setTimeout(() => setSuccessMessage(""), 4000);

//       // Redirect if coming from orders
//       if (fromOrders) navigate("/admin/order");
//     } catch (error) {
//       console.error("Error occurred:", error);
//       setSuccessMessage("Failed to add vehicle. Please try again.");
//     }
//   };

//   const renderVehicleTable = () => (
//     <Table striped bordered hover className="mt-4">
//       <thead>
//         <tr>
//           <th>Year</th>
//           <th>Make</th>
//           <th>Model</th>
//           <th>Type</th>
//           <th>Color</th>
//           <th>Mileage</th>
//           <th>Tag</th>
//           <th>Serial</th>
//         </tr>
//       </thead>
//       <tbody>
//         {vehicleData.map((vehicle) => (
//           <tr key={vehicle.vehicle_id}>
//             <td>{vehicle.vehicle_year}</td>
//             <td>{vehicle.vehicle_make}</td>
//             <td>{vehicle.vehicle_model}</td>
//             <td>{vehicle.vehicle_type}</td>
//             <td>{vehicle.vehicle_color}</td>
//             <td>{vehicle.vehicle_mileage}</td>
//             <td>{vehicle.vehicle_tag}</td>
//             <td>{vehicle.vehicle_serial}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );

//   return (
//     <div className="customer-detail-container">
//       {/* Customer Information Section */}
//       <div className="customer-info-section">
//         <h2 className="section-title">
//           <FontAwesomeIcon icon={faUser} className="icon" /> Customer
//           Information
//         </h2>
//         <div className="info-card">
//           <div className="info-item">
//             <span className="info-label">Name: </span>
//             <span className="info-value">
//               {customerData?.customer_first_name}{" "}
//               {customerData?.customer_last_name}
//             </span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">Email: </span>
//             <span className="info-value">{customerData?.customer_email}</span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">Phone: </span>
//             <span className="info-value">
//               {customerData?.customer_phone_number}
//             </span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">Status:</span>
//             <span className="info-value">
//               {customerData?.active_customer_status ? "Active" : "Inactive"}
//             </span>
//           </div>
//           <div className="info-item">
//             <span className="info-label">Edit Customer Info:</span>
//             <button type="button" onClick={handleEdit}>
//               <FontAwesomeIcon color="red" icon={faEdit} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Vehicle Section */}
//       <div className="vehicle-info-section">
//         <h2 className="section-title">
//           <FontAwesomeIcon icon={faCar} className="icon" /> Vehicles of{" "}
//           {customerData?.customer_first_name}
//         </h2>

//         {vehicleData.length > 0 ? (
//           renderVehicleTable()
//         ) : (
//           <div className="info-card">
//             <div>No vehicles found</div>
//           </div>
//         )}

//         {!showVehicleForm && (
//           <button
//             type="button"
//             className="theme-btn btn-style-one add-new-vehicle"
//             onClick={() => setShowVehicleForm(true)}
//           >
//             Add new vehicle
//           </button>
//         )}

//         {showVehicleForm && (
//           <div className="info-card add-new-vehicle-box">
//             <div
//               className="section-header1"
//               style={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               <Button
//                 variant="link"
//                 type="button"
//                 onClick={() => setShowVehicleForm(false)}
//               >
//                 <FontAwesomeIcon icon={faTimes} className="text-danger" />
//               </Button>
//             </div>

//             <section className="contact-section">
//               <div className="auto-container">
//                 <div className="contact-title">
//                   <h2>Add a new vehicle</h2>
//                 </div>
//                 {successMessage && (
//                   <div className="alert alert-success">{successMessage}</div>
//                 )}

//                 <div className="row clearfix">
//                   <div className="form-column col-lg-7">
//                     <div className="inner-column">
//                       <div className="contact-form">
//                         <form onSubmit={handleSubmit}>
//                           {[
//                             {
//                               label: "Vehicle year",
//                               value: vehicle_year,
//                               setter: setVehicleYear,
//                             },
//                             {
//                               label: "Vehicle make",
//                               value: vehicle_make,
//                               setter: setVehicleMake,
//                             },
//                             {
//                               label: "Vehicle model",
//                               value: vehicle_model,
//                               setter: setVehicleModel,
//                               required: true,
//                             },
//                             {
//                               label: "Vehicle type",
//                               value: vehicle_type,
//                               setter: setVehicleType,
//                             },
//                             {
//                               label: "Vehicle mileage",
//                               value: vehicle_mileage,
//                               setter: setVehicleMileage,
//                               required: true,
//                             },
//                             {
//                               label: "Vehicle tag",
//                               value: vehicle_tag,
//                               setter: setVehicleTag,
//                               required: true,
//                             },
//                             {
//                               label: "Vehicle serial",
//                               value: vehicle_serial,
//                               setter: setVehicleSerial,
//                               required: true,
//                             },
//                             {
//                               label: "Vehicle color",
//                               value: vehicle_color,
//                               setter: setVehicleColor,
//                               required: true,
//                             },
//                           ].map((field, idx) => (
//                             <div className="form-group col-md-12" key={idx}>
//                               <input
//                                 type="text"
//                                 name={field.label}
//                                 value={field.value}
//                                 onChange={(e) => field.setter(e.target.value)}
//                                 placeholder={field.label}
//                                 required={field.required || false}
//                               />
//                             </div>
//                           ))}

//                           <div className="form-group col-md-12">
//                             <button
//                               type="submit"
//                               className="theme-btn btn-style-one"
//                             >
//                               Add vehicle
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}
//       </div>

//       {/* Orders Section */}
//       <div className="orders-info-section">
//         <h2 className="section-title">
//           <FontAwesomeIcon icon={faShoppingCart} className="icon" /> Orders of{" "}
//           {customerData?.customer_first_name}
//         </h2>
//         {order && <OrdersComponent orderFromCustomer={order} />}
//       </div>
//     </div>
//   );
// }

// export default CustomerDetailComponent;

import React, { useState, useEffect } from "react";
import {
  Form,
  Table,
  Button,
  ListGroup,
  FormCheck,
  Card,
  Spinner,
  Badge,
} from "react-bootstrap";
import DetailCard from "../DetailCard/DetailCard";
import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import orderService from "../../../../services/order.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewOrdersComponent() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customService, setCustomService] = useState({
    description: "",
    price: 0,
  });
  const [service_price, setServicePrice] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [showAddCustomer, setShowAddCustomer] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [completionData, setCompletionData] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const orderEdit = location.state?.order;
  console.log(orderEdit);

  console.log(customers[0]?.customer_id);
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();

  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }
  // Search customers with debounce
  useEffect(() => {
    const searchCustomers = async () => {
      if (searchQuery.length > 0) {
        try {
          setLoading(true);
          const customers = await customerService.customerSearch(
            searchQuery,
            loggedInEmployeeToken
          );

          console.log("Received customers:", customers); // Debug log

          setCustomers(customers);

          setError("");
        } catch (err) {
          setError("Error searching customers");
          setCustomers([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCustomers([]); // Clear results when search query is too short
      }
    };

    const timerId = setTimeout(searchCustomers, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery, loggedInEmployeeToken]);
  console.log(customers);
  console.log(selectedCustomer);
  // Fetch vehicles when customer is selected
  useEffect(() => {
    const fetchVehicles = async () => {
      setShowAddVehicle(false);
      if (selectedCustomer) {
        console.log(selectedCustomer.customer_id);
        try {
          setLoading(true);
          // const vehicles = await vehicleService.getVehicle(
          //   selectedCustomer.customer_id,
          //   loggedInEmployeeToken
          // );
          // console.log("Vehicles fetched:", vehicles);
          // const vehiclesArray = Array.isArray(response.data)
          //   ? response.data
          //   : [];

          // if (vehiclesArray.length === 0) {
          //   setShowAddVehicle(true);
          //   setVehicles([]);
          // } else {
          //   setVehicles(vehiclesArray); // ✅ now you're setting the array
          //   setShowAddVehicle(false);
          // }
          const response = await vehicleService.getVehicle(
            selectedCustomer.customer_id,
            loggedInEmployeeToken
          );

          console.log("Vehicles fetched:", response);

          const vehiclesArray = Array.isArray(response.data)
            ? response.data
            : [];

          if (vehiclesArray.length === 0) {
            setShowAddVehicle(true);
            setVehicles([]);
          } else {
            setVehicles(vehiclesArray);
            setShowAddVehicle(false);
          }

          console.log(Array.isArray(vehiclesArray));
        } catch (err) {
          setError("Error fetching vehicles");
          setVehicles([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchVehicles();
  }, [selectedCustomer, loggedInEmployeeToken]); // Add token to dependencies

  console.log(loggedInEmployeeToken);
  // Fetch common services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const services = await serviceService.getAllServices(
          loggedInEmployeeToken
        );
        // Filter only active services
        // console.log(services.data)
        const activeServices = services.data.filter(
          (service) => service.active_service
        );
        setServices(activeServices);
      } catch (err) {
        setError("Error fetching services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [loggedInEmployeeToken]);

  // Selection handlers
  const handleServiceSelect = (service) => {
    //.some() checks whether at least one element in the prev array satisfies the condition inside.
    setSelectedServices((prev) =>
      prev.some((s) => s.service_id === service.service_id)
        ? prev.filter((s) => s.service_id !== service.service_id)
        : [...prev, service]
    );
  };
  console.log(selectedServices[0]?.service_price);

  useEffect(() => {
    const serviceTotal = selectedServices.reduce(
      (sum, service) => sum + parseFloat(service.service_price),
      0
    );
    const additionalPrice = parseFloat(service_price) || 0;
    setTotalPrice(serviceTotal + additionalPrice);
  }, [selectedServices, service_price]);

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        employee_id: employee.employee_id,
        customer_id: selectedCustomer.customer_id,
        vehicle_id: selectedVehicle.vehicle_id,
        additional_service_description: service_description,
        active_order: 0,
        order_completed: 0,
        order_services: selectedServices,
        additional_service_price: service_price,
        totalPrice,
        estimated_completion_date: completionData,
      };
      const order = await orderService.createOrder(
        orderData,
        loggedInEmployeeToken
      );
      // Handle success (reset state/show confirmation)
      setSuccessMessage("Order added successfully");
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      setSelectedServices([]);
      setSelectedVehicle(null);
      setSelectedCustomer(null);
      navigate("/admin/orders");
    } catch (err) {
      setError("Error submitting order");
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 contact-section">
      <div className="contact-title, success">
        <h2>Create a new order</h2>
        {successMessage && (
          <Card className="mt-3">
            <Card.Body>{successMessage}</Card.Body>
          </Card>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Customer Search Section */}
      {!selectedCustomer && (
        <Card style={{ borderRadius: "10px" }} className="mb-4">
          <Card.Body>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search customers by name, email, or phone"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAddCustomer(e.target.value === "");
                }}
              />
            </Form>

            {loading ? (
              <Spinner animation="border" role="status" />
            ) : customers?.length > 0 ? ( // Add optional chaining
              <Table striped hover>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      onClick={() => setSelectedCustomer(customer)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        {customer.customer_first_name}{" "}
                        {customer.customer_last_name}
                      </td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>Select-icon</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              searchQuery && <p>No customers found</p>
            )}

            {showAddCustomer && (
              <div className="form-group col-md-12">
                <button
                  style={{ marginTop: "1rem" }}
                  className="theme-btn btn-style-one"
                  type="submit"
                  data-loading-text="Please wait..."
                  variant="primary"
                  onClick={() =>
                    navigate("/admin/add-customer", {
                      state: { fromOrders: true },
                    })
                  }
                >
                  <span>Add New customer</span>
                </button>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
      {/* Selected Customer */}
      {selectedCustomer && (
        <DetailCard
          data={selectedCustomer}
          type="customer"
          onClear={() => {
            setSelectedCustomer(null);
          }}
        />
      )}

      {/* Vehicle Selection */}
      {showAddVehicle ? (
        <Card style={{ borderRadius: "10px" }}>
          <Card.Header>No Vehicles found for this Customer</Card.Header>
          <div className="form-group col-md-12">
            <button
              style={{ marginTop: "1rem" }}
              className="theme-btn btn-style-one"
              // type="submit"
              type="button"
              data-loading-text="Please wait..."
              variant="primary"
              onClick={() =>
                navigate(
                  `/admin/customer-detail/${selectedCustomer?.customer_id}`,
                  {
                    state: { selectedCustomer, fromOrders: true },
                  }
                )
              }
            >
              <span>Add Vehicle for this customer</span>
            </button>
          </div>
        </Card>
      ) : (
        selectedCustomer &&
        !selectedVehicle && (
          <div className="my-4">
            <Card style={{ borderRadius: "10px" }}>
              <Card.Body>
                <h4>Choose a Vehicle</h4>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Tag</th>
                      <th>Serial</th>
                      <th>Color</th>
                      <th>Mileage</th>
                      <th>Choose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center" }}>
                          <Spinner animation="border" role="status" />
                        </td>
                      </tr>
                    ) : (
                      Array.isArray(vehicles) &&
                      vehicles.map((vehicle) => (
                        <tr
                          key={vehicle.vehicle_id}
                          onClick={() => setSelectedVehicle(vehicle)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{vehicle.vehicle_year}</td>
                          <td>{vehicle.vehicle_make}</td>
                          <td>{vehicle.vehicle_model}</td>
                          <td>{vehicle.vehicle_tag}</td>
                          <td>{vehicle.vehicle_serial}</td>
                          <td>{vehicle.vehicle_color}</td>
                          <td>{vehicle.vehicle_mileage}</td>
                          <td>select-icon</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )
      )}
      {/* Selected Vehicle */}
      {selectedVehicle && (
        <DetailCard
          data={selectedVehicle}
          type="vehicle"
          onClear={() => setSelectedVehicle(null)}
        />
      )}
      {/* Services Selection */}
      {selectedVehicle && (
        <div className="my-4">
          <Card style={{ borderRadius: "10px" }}>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ marginBottom: "1.5rem" }}>Choose Service</h4> Only
                active Services are displayed
              </div>
              <ListGroup>
                {loading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  services?.map((service) => (
                    <div key={service.service_id}>
                      <Card className="mb-1" style={{ borderRadius: "10px" }}>
                        <Card.Body>
                          <div className="service-item1">
                            <div>
                              <h4>{service.service_name}</h4>
                              <div>{service.service_description}</div>
                              <div style={{ color: "red" }}>
                                $ {service.service_price}
                              </div>
                            </div>
                            <div className="checkbox-container">
                              <FormCheck
                                onChange={() => handleServiceSelect(service)}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card style={{ borderRadius: "10px" }} className="mt-3">
            <Card.Body>
              <div className="row clearfix">
                <div className="form-column col-lg-7">
                  <div className="inner-column">
                    <div className="contact-form">
                      <div className="contact-title">
                        <h2>Additional requests</h2>
                      </div>
                      <div className="row clearfix">
                        <div className="form-group col-md-12">
                          <textarea
                            type="text"
                            name="service_description"
                            value={service_description}
                            onChange={(event) =>
                              setServiceDescription(event.target.value)
                            }
                            placeholder="Service description"
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            name="price"
                            value={service_price}
                            onChange={(event) =>
                              setServicePrice(event.target.value)
                            }
                            placeholder="price"
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label>Estimated Completion Date:</label>
                        <DatePicker
                          selected={completionData}
                          onChange={(date) => setCompletionData(date)}
                          dateFormat="yyyy-MM-dd"
                          minDate={new Date()}
                          className="form-control"
                          placeholderText="Select a date"
                        />
                      </div>
                      <Card className="mt-3">
                        <Card.Body>
                          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                        </Card.Body>
                      </Card>
                      {loading ? (
                        <Spinner animation="border" role="status" />
                      ) : (
                        <div className="form-group col-md-12">
                          <button
                            style={{ marginTop: "1rem" }}
                            className="theme-btn btn-style-one"
                            type="submit"
                            data-loading-text="Please wait..."
                            variant="primary"
                            onClick={handleSubmitOrder}
                            disabled={
                              selectedServices.length === 0 &&
                              !customService.description
                            }
                          >
                            <span>Create order</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default NewOrdersComponent;
