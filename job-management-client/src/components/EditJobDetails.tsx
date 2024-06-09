import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Job } from "../types/types";
import { useNavigate } from "react-router-dom";

const EditJobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    axios
      .get(`/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => console.error(error.response.data));
  }, [id]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put(`/jobs/${id}`, job)
      .then((response) => {
        navigate(`/jobs/${response.data.id}`);
      })
      .catch((error) => console.error(error.response.data));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJob((prevJob: Job | null) => ({
      ...prevJob!,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <div className="display-flex">
        <h1>Edit Job Details</h1>
        <button className="btn-add" onClick={handleGoBack}>
          Back to Jobs
        </button>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={job.customerName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Job Type:</label>
          <input
            type="text"
            name="jobType"
            value={job.jobType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={job.status}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={job.appointmentDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Technician:</label>
          <input
            type="text"
            name="technician"
            value={job.technician}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJobDetails;
