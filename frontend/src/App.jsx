import { useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import JobsPage from "./pages/JobsPage";
import PostJobPage from "./pages/PostJobPage";

function Navigation() {
  const location = useLocation();

  const navClass = (path) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "bg-slate-200 text-slate-800 hover:bg-slate-300"
    }`;

  return (
    <div className="flex flex-wrap gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <Link className={navClass("/jobs")} to="/jobs">
        Jobs
      </Link>
      <Link className={navClass("/post")} to="/post">
        Post Job
      </Link>
      <Link className={navClass("/apply")} to="/apply">
        Apply
      </Link>
    </div>
  );
}

function App() {
  const [selectedJobId, setSelectedJobId] = useState("");
  const navigate = useNavigate();

  const onPickJobForApplication = (jobId) => {
    setSelectedJobId(jobId);
    navigate("/apply");
  };

  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
        <h1 className="text-3xl font-bold text-slate-900">Job Search Portal</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage onPickJobForApplication={onPickJobForApplication} />} />
          <Route path="/post" element={<PostJobPage />} />
          <Route path="/apply" element={<ApplyPage selectedJobId={selectedJobId} />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
