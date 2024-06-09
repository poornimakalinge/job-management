const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3300;

app.use(bodyParser.json());

let jobs = [
  {
    id: 1,
    customerName: "John Doe",
    jobType: "Plumbing",
    status: "Scheduled",
    appointmentDate: "2024-06-15T09:00:00Z",
    technician: "Jane Smith",
  },
  {
    id: 2,
    customerName: "Alice Johnson",
    jobType: "Electrical",
    status: "Completed",
    appointmentDate: "2024-05-20T14:00:00Z",
    technician: "Bob Brown",
  },
];

app.get("/jobs", (req, resp) => {
  resp.json(jobs);
});

app.get("/jobs/:id", (req, resp) => {
  const found_job = jobs.find((job) => job.id == req.params.id);
  if (found_job) resp.status(200).json(found_job);
  else resp.status(404).send("Job not found");
});

app.put("/jobs/:id", (req, resp) => {
  const found_job = jobs.find((job) => job.id == req.params.id);
  if (found_job) {
    Object.assign(found_job, req.body);
    resp.status(200).json(found_job);
  } else resp.status(404).send("Job not found");
});

app.post("/jobs", (req, resp) => {
  const new_job = req.body;
  new_job.id = jobs.length ? jobs[jobs.length - 1].id + 1 : 1;
  jobs.push(new_job);
  resp.status(201).json(new_job);
});

app.delete("/jobs/:id", (req, resp) => {
  const job_index = jobs.findIndex((job) => job.id == req.params.id);
  if (job_index > -1) {
    const deleted_job = jobs.splice(job_index, 1);
    resp.status(200).json(deleted_job);
  } else resp.status(404).send("Job not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
