import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialProductSalesData } from "../../data/salesData";

interface FilterState {
  dashboardSelectedMonth: string | "all";

  dashboardSelectedProduct: string | null;

  comparisonProduct1: string | null;
  comparisonProduct2: string | null;
}

const initialState: FilterState = {
  dashboardSelectedMonth: "all",
  dashboardSelectedProduct: initialProductSalesData[0]?.produto || null,
  comparisonProduct1: null,
  comparisonProduct2: null,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDashboardSelectedMonth: (
      state,
      action: PayloadAction<string | "all">,
    ) => {
      state.dashboardSelectedMonth = action.payload;
    },
    setDashboardSelectedProduct: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.dashboardSelectedProduct = action.payload;
    },
    setComparisonProduct1: (state, action: PayloadAction<string | null>) => {
      state.comparisonProduct1 = action.payload;
    },
    setComparisonProduct2: (state, action: PayloadAction<string | null>) => {
      state.comparisonProduct2 = action.payload;
    },
    resetAllFilters: (state) => {
      state.dashboardSelectedMonth = "all";
      state.dashboardSelectedProduct =
        initialProductSalesData[0]?.produto || null;
      state.comparisonProduct1 = null;
      state.comparisonProduct2 = null;
    },
  },
});

export const {
  setDashboardSelectedMonth,
  setDashboardSelectedProduct,
  setComparisonProduct1,
  setComparisonProduct2,
  resetAllFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

import type { RootState } from "../index";

export const selectDashboardSelectedMonth = (state: RootState) =>
  state.filters.dashboardSelectedMonth;
export const selectDashboardSelectedProduct = (state: RootState) =>
  state.filters.dashboardSelectedProduct;
export const selectComparisonProduct1 = (state: RootState) =>
  state.filters.comparisonProduct1;
export const selectComparisonProduct2 = (state: RootState) =>
  state.filters.comparisonProduct2;
