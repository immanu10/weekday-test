import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setListings, setLoading } from "../store/jobsSlice";

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
  const { loading, error, listings } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  const observerTarget = useRef(null);

  const fetchData = async () => {
    dispatch(setLoading(true));

    const data = await fetchJobsListings(page * 10);
    console.log(data);

    dispatch(setListings(data.jdList));
    setPage((prev) => prev + 1);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
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
  }, [observerTarget, page]);
  console.log({ page });

  return (
    <div>
      {listings.map((job) => (
        <div key={job.jdUid} className="job-card">
          <h2>{job.jobRole}</h2>
          <p>Company: {job.companyName}</p>
          <p>Location: {job.location}</p>
          <p>Description: {job.jobDetailsFromCompany}</p>
          <p>Experience Required: {job.maxExp}</p>
          <button>Apply</button>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div ref={observerTarget}></div>
    </div>
  );
}
