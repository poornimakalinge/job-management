import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [technician, setTechnician] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !customerName ||
      !jobType ||
      !status ||
      !appointmentDate ||
      !technician
    ) {
      setErrorMessage(true);
      return;
    }
    const new_job = {
      customerName,
      jobType,
      status,
      appointmentDate,
      technician,
    };
    axios
      .post("/jobs", new_job)
      .then(() => navigate("/"))
      .catch((error) => console.error(error.response.data));
  };

  setTimeout(() => {
    setErrorMessage(false);
  }, 2000);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="display-flex">
        <h1>Add Job</h1>
        <button className="btn-add" onClick={handleGoBack}>
          Back to Jobs
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <label>Job Type:</label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <label>Technician:</label>
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          />
        </div>
        <button className="mr-1" type="submit">
          Add Job
        </button>
        <div className={`error-message ${errorMessage ? "visible" : "hidden"}`}>
          Please enter all the details
        </div>
      </form>
    </div>
  );
};

export default AddJob;
