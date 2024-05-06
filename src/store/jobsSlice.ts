import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type JobFilter = {
  minExperience: number | undefined;
  companyName: string;
  location: string;
  role: string;
  minBasePay: number | undefined;
};

export type JobItem = {
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
    minExperience: undefined,
    companyName: "",
    location: "",
    role: "",
    minBasePay: undefined,
  },
  loading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<JobItem[]>) => {
      let list = new Set([...state.listings, ...action.payload]);
      state.listings = [...list];
    },
    setFilters: (state, action: PayloadAction<Partial<JobFilter>>) => {
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
