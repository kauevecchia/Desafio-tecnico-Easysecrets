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
import { ProductInsights } from "./ProductInsights";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ExportConfirmationDialog } from "./ExportConfirmationDialog";

const PRODUCT_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00bcd4",
  "#7cb342",
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

  const LINE_CHART_SVG_ID = "product-line-chart-svg";
  const LINE_CHART_FILENAME = `vendas-${selectedProductForLineChart?.replace(' ', '-') || 'produto'}-detalhe`;


  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <Card className="w-full md:w-2/3 flex flex-col min-h-[400px]">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-foreground text-xl font-semibold">
              Vendas Detalhadas do Produto
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
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
              {selectedProductForLineChart && productSalesForLineChart.length > 0 && (
                <ExportConfirmationDialog svgElementId={LINE_CHART_SVG_ID} filename={LINE_CHART_FILENAME}>
                  <Button variant="outline" size="icon" className="ml-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </ExportConfirmationDialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <ProductLineChart
            data={productSalesForLineChart}
            lineColor={lineChartColor}
            svgId={LINE_CHART_SVG_ID}
          />
        </CardContent>
      </Card>
      <div className="w-full md:w-1/3">
        <ProductInsights />
      </div>
    </section>
  );
}
