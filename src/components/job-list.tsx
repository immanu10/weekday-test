import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setListings, setLoading } from "../store/jobsSlice";
import { JobCard } from "./job-card";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

async function fetchJobsListings(offset: number = 0) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 10,
    offset,
  });
  console.log({ offset });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export function JobList() {
  const [page, setPage] = useState(0);
  const { loading, error, listings, filters } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  const observerTarget = useRef(null);

  const fetchData = async () => {
    dispatch(setLoading(true));
    const data = await fetchJobsListings(page * 10);
    dispatch(setListings(data.jdList));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    // handle case when all pages are fetched.
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const filteredListings = listings.filter((job) => {
    const { minExperience, companyName, location, role, minBasePay } = filters;
    const isWithinSalaryRange =
      job.minJdSalary !== null &&
      job.maxJdSalary !== null &&
      (minBasePay === undefined ||
        (minBasePay >= job.minJdSalary && minBasePay <= job.maxJdSalary));

    const matchesFilters =
      job.companyName.toLowerCase().includes(companyName.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase()) &&
      job.jobRole.toLowerCase().includes(role.toLowerCase());

    const passesExperienceFilter =
      minExperience === undefined ||
      (job.minExp !== null && job.minExp <= minExperience);
    const passesSalaryFilter = minBasePay === null || isWithinSalaryRange;

    return matchesFilters && passesExperienceFilter && passesSalaryFilter;
  });

  if (error) return <p color="red">Something went wrong!</p>;

  return (
    <Box my={4} px={3}>
      <Grid container spacing={2} justifyContent="center" width="100%">
        {filteredListings.map((job) => (
          <Grid key={job.jdUid} item xs={12} md={4}>
            <JobCard data={job} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          my={4}
          gap={2}
        >
          <CircularProgress size={30} />
          <Typography variant="overline">Loading more...</Typography>
        </Box>
      )}
      <div ref={observerTarget}></div>
    </Box>
  );
}
