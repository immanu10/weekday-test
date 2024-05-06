import { Typography } from "@mui/material";
import "./App.css";
import { JobFilters } from "./components/job-filters";
import { JobList } from "./components/job-list";

function App() {
  return (
    <>
      <Typography variant="h1" fontSize={20} textAlign="center" my={1}>
        Weekday Test - Search Jobs
      </Typography>
      <JobFilters />
      <JobList />
    </>
  );
}

export default App;
