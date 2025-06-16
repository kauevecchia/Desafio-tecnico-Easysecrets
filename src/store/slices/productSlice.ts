import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialProductSalesData, type ProductData } from "../../data/salesData";

interface ProductState {
  data: ProductData[];
  error: string | null;
}

const initialState: ProductState = {
  data: initialProductSalesData,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;


import type { RootState } from "../index";
export const selectAllProductsData = (state: RootState) => state.product.data;

export const selectAllProductNames = (state: RootState) =>
  state.product.data.map((p) => p.produto);

export const selectProductDataByName =
  (productName: string) => (state: RootState) =>
    state.product.data.find((p) => p.produto === productName);

export const selectProductSalesByName =
  (productName: string) => (state: RootState) =>
    state.product.data.find((p) => p.produto === productName)?.vendas || [];
