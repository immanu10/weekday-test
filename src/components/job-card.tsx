import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { JobItem } from "../store/jobsSlice";
import { useState } from "react";

export function JobCard({ data }: { data?: JobItem }) {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 200;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: "16px" }}>
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Box
          px={1}
          sx={{
            border: 1,
            borderColor: "#ebe8e8",
            borderRadius: 4,
            width: "fit-content",
          }}
        >
          <Typography
            variant="caption"
            fontSize={10}
          >{`⏳ Posted 3 days ago`}</Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <Avatar
            src={data?.logoUrl}
            alt={`${data?.companyName} logo`}
            variant="square"
          />
          <Box>
            <Typography
              variant="h2"
              color="#8b8b8b"
              fontSize={14}
              fontWeight={600}
            >
              {data?.companyName}
            </Typography>
            <Typography variant="subtitle2" fontSize={16} fontWeight={300}>
              {data?.jobRole}
            </Typography>
            <Typography variant="caption" fontWeight={500}>
              {data?.location}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="#4d596a" fontWeight={400}>
          {`Estimated Salary: ${data?.minJdSalary || ""}${
            data?.minJdSalary && data?.maxJdSalary ? "-" : ""
          }${data?.maxJdSalary || ""}${
            data?.salaryCurrencyCode ? ` ${data.salaryCurrencyCode}` : ""
          }`}
        </Typography>
        <Box>
          <Typography variant="subtitle2">About us</Typography>
          <Typography variant="body2">
            {expanded
              ? data?.jobDetailsFromCompany
              : data?.jobDetailsFromCompany?.slice(0, maxChars) +
                (data?.jobDetailsFromCompany?.length ?? 0 > maxChars
                  ? "..."
                  : "")}
            {data?.jobDetailsFromCompany &&
              data.jobDetailsFromCompany.length > maxChars && (
                <span
                  onClick={toggleExpand}
                  style={{ fontSize: "14px", color: "blue", cursor: "pointer" }}
                >
                  {expanded ? "less" : "more"}
                </span>
              )}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Minimum Experience</Typography>
          <Typography variant="body2">
            {`${data?.minExp ? `${data.minExp} years` : "not mentioned"}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#55efc4",
            color: "black",
            ":hover": {
              backgroundColor: "#4ce6ba",
            },
          }}
          href={data?.jdLink}
        >
          ⚡ Easy Apply
        </Button>
      </Box>
    </Paper>
  );
}
