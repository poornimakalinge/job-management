import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Job } from "../types/types";
import { useNavigate } from "react-router-dom";

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/jobs/${id}`)
      .then((response) => setJob(response.data))
      .catch((error) => setErrorMessage(error.response.data));
  }, [id]);

  const handleAddJobClick = () => {
    navigate(`/jobs/${job?.id}/edit`);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!job && errorMessage)
    return <div className="text-ctr err">{errorMessage}</div>;
  else if (!job) return <div className="text-ctr">Loading...</div>;

  return (
    <div>
      <div className="display-flex">
        <h1>Job Details</h1>
        <button className="btn-add" onClick={handleAddJobClick}>
          Edit Job
        </button>
        <button className="btn-add" onClick={handleGoBack}>
          Back to Jobs
        </button>
      </div>
      <p>
        <label className="job-label">Customer:</label> {job.customerName}
      </p>
      <p>
        <label className="job-label">Job type:</label> {job.jobType}
      </p>
      <p>
        <label className="job-label">Status:</label> {job.status}
      </p>
      <p>
        <label className="job-label">Appointment Date:</label>{" "}
        {new Date(job.appointmentDate).toLocaleString()}
      </p>
      <p>
        <label className="job-label">Technician:</label> {job.technician}
      </p>
    </div>
  );
};

export default JobDetails;
