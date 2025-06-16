import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ProductsComparison } from "./pages/ProductsComparison";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout />
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="products-comparison" element={<ProductsComparison />} />
      </Route>
    </Routes>
  );
}