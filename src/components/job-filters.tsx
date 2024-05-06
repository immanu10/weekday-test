import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { JobFilter, setFilters } from "../store/jobsSlice";

export function JobFilters() {
  const filters = useSelector((state: RootState) => state.jobs.filters);
  const dispatch = useDispatch();

  const handleInputChange = (
    field: keyof JobFilter,
    value: string | number
  ) => {
    dispatch(setFilters({ [field]: value }));
  };

  return (
    <Box my={2} p={2}>
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            label="Company Name"
            value={filters.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Location"
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="Role"
            value={filters.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="IOS">IOS</MenuItem>
            <MenuItem value="Android">Android</MenuItem>
            <MenuItem value="Tech lead">Tech lead</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Minimum Experience"
            value={filters.minExperience}
            onChange={(e) => handleInputChange("minExperience", e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value={1}>1 Year</MenuItem>
            <MenuItem value={2}>2 Years</MenuItem>
            <MenuItem value={3}>3 Years</MenuItem>
            <MenuItem value={4}>4 Years</MenuItem>
            <MenuItem value={5}>5 Years</MenuItem>
            <MenuItem value={6}>6 Years</MenuItem>
            <MenuItem value={7}>7 Years</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Minimum Base Pay"
            value={filters.minBasePay}
            onChange={(e) => handleInputChange("minBasePay", e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value={0}>0L</MenuItem>
            <MenuItem value={10}>10L</MenuItem>
            <MenuItem value={20}>20L</MenuItem>
            <MenuItem value={30}>30L</MenuItem>
            <MenuItem value={40}>40L</MenuItem>
            <MenuItem value={50}>50L</MenuItem>
            <MenuItem value={60}>60L</MenuItem>
            <MenuItem value={70}>70L</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
