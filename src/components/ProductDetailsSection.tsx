import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ProductLineChart } from "@/lib/charts/ProductLineChart";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectAllProductNames,
  selectProductSalesByName,
} from "@/store/slices/productSlice";
import {
  selectDashboardSelectedProduct,
  setDashboardSelectedProduct,
} from "@/store/slices/filterSlice";
import { ProductInsightsPanel } from "./ProductInsights";

const PRODUCT_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

export function ProductDetailsSection() {
  const dispatch = useAppDispatch();

  const allProductNames = useAppSelector(selectAllProductNames);
  const selectedProductForLineChart = useAppSelector(
    selectDashboardSelectedProduct,
  );
  const productSalesForLineChart = useAppSelector(
    selectProductSalesByName(selectedProductForLineChart || ""),
  );

  const handleProductChangeForLineChart = (value: string) => {
    dispatch(setDashboardSelectedProduct(value || null));
  };

  const selectedProductIndex = selectedProductForLineChart
    ? allProductNames.indexOf(selectedProductForLineChart)
    : -1;
  const lineChartColor =
    selectedProductIndex !== -1
      ? PRODUCT_COLORS[selectedProductIndex % PRODUCT_COLORS.length]
      : "#8884d8";

  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <Card className="flex min-h-[400px] w-full flex-col md:w-2/3">
        <CardHeader>
          <CardTitle className="text-foreground text-xl font-semibold">
            Vendas Detalhadas do Produto
          </CardTitle>
          <div className="mt-2 flex items-center gap-2">
            <label
              htmlFor="product-select"
              className="text-muted-foreground text-sm"
            >
              Produto:
            </label>
            <Select
              onValueChange={handleProductChangeForLineChart}
              value={selectedProductForLineChart || ""}
            >
              <SelectTrigger
                id="product-select"
                className="w-[180px] md:w-[200px]"
              >
                <SelectValue placeholder="Selecione um Produto" />
              </SelectTrigger>
              <SelectContent>
                {allProductNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 md:p-6">
          <ProductLineChart
            data={productSalesForLineChart}
            lineColor={lineChartColor}
          />
        </CardContent>
      </Card>
      <div className="flex w-full flex-col gap-4 md:w-1/3">
        <ProductInsightsPanel />
      </div>
    </section>
  );
}
