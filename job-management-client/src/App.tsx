import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import AddJob from "./components/AddJob";
import EditJobDetails from "./components/EditJobDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/edit" element={<EditJobDetails />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
