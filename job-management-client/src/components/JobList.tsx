import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Job } from "../types/types";
import { useNavigate } from "react-router-dom";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => setErrorMessage(error.response.data));
  }, []);

  const handleAddJobClick = () => {
    navigate("/add-job");
  };

  const handleViewJobClick = (job_id: number) => {
    navigate(`/jobs/${job_id}`);
  };

  const handleEditJobClick = (job_id: number) => {
    navigate(`/jobs/${job_id}/edit`);
  };

  const handleDelete = (job_id: number) => {
    axios
      .delete(`/jobs/${job_id}`)
      .then(() => {
        setJobs(jobs.filter((job) => job.id !== job_id));
      })
      .catch((error) => console.error(error.response.data));
  };

  if (errorMessage) return <div className="text-ctr err">{errorMessage}</div>;
  else if (!jobs.length) return <div className="text-ctr">Loading...</div>;

  return (
    <div className="jobs-container">
      <div className="display-flex">
        <h1>Job List</h1>
        <button className="btn-add" onClick={handleAddJobClick}>
          Add Job
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Appointment Date</th>
            <th>Technician</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.customerName}</td>
              <td>{job.jobType}</td>
              <td>{job.status}</td>
              <td>{job.appointmentDate}</td>
              <td>{job.technician}</td>
              <td>
                <button onClick={() => handleViewJobClick(job.id)}>View</button>
                {" | "}
                <button onClick={() => handleEditJobClick(job.id)}>Edit</button>
                {" | "}
                <button onClick={() => handleDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
