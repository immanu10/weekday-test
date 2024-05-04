import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type JobFilter = {
  minExperience: number;
  companyName: string;
  location: string;
  remote: false;
  techStack: string;
  role: string;
  minBasePay: 0;
};
type JobItem = {
  jdUid: string;
  companyName: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
};

export interface JobsState {
  listings: JobItem[];
  filters: JobFilter;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  listings: [],
  filters: {
    minExperience: 0,
    companyName: "",
    location: "",
    remote: false,
    techStack: "",
    role: "",
    minBasePay: 0,
  },
  loading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<JobItem[]>) => {
      state.listings = [...state.listings, ...action.payload];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setListings, setFilters, setLoading, setError } =
  jobsSlice.actions;

export default jobsSlice.reducer;
