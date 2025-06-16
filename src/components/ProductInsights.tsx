import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectDashboardSelectedProduct } from "@/store/slices/filterSlice";
import { selectProductDataByName } from "@/store/slices/productSlice";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ProductInsights() {
  const selectedProduct = useAppSelector(selectDashboardSelectedProduct);
  const productData = useAppSelector(
    selectProductDataByName(selectedProduct || ""),
  );

  let totalSales = 0;
  let averageSales = 0;
  let bestMonth = { mes: "", quantidade: 0 };
  let worstMonth = { mes: "", quantidade: Infinity };
  let salesTrend: "up" | "down" | "stable" | null = null;

  if (productData && productData.vendas.length > 0) {
    totalSales = productData.vendas.reduce(
      (sum, sale) => sum + sale.quantidade,
      0,
    );
    averageSales = totalSales / productData.vendas.length;

    productData.vendas.forEach((sale) => {
      if (sale.quantidade > bestMonth.quantidade) {
        bestMonth = sale;
      }
      if (sale.quantidade < worstMonth.quantidade) {
        worstMonth = sale;
      }
    });

    if (productData.vendas.length >= 2) {
      const firstMonthSales = productData.vendas[0].quantidade;
      const lastMonthSales =
        productData.vendas[productData.vendas.length - 1].quantidade;
      if (lastMonthSales > firstMonthSales) {
        salesTrend = "up";
      } else if (lastMonthSales < firstMonthSales) {
        salesTrend = "down";
      } else {
        salesTrend = "stable";
      }
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-semibold">
          Insights do Produto
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {!selectedProduct ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-center">
            <p className="font-semibold opacity-50">
              Selecione um produto para ver os insights.
            </p>
          </div>
        ) : !productData ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-center">
            <p className="font-semibold opacity-50">
              Dados não encontrados para {selectedProduct}.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-muted flex items-center justify-between rounded-md p-3">
              <span className="text-muted-foreground text-sm font-medium">
                Vendas Totais:
              </span>
              <span className="text-primary md:text-lg font-bold">
                {totalSales} unidades
              </span>
            </div>
            <div className="bg-muted flex items-center justify-between rounded-md p-3">
              <span className="text-muted-foreground text-sm font-medium">
                Vendas Médias/Mês:
              </span>
              <span className="text-primary md:text-lg font-bold">
                {averageSales.toFixed(0)} unidades
              </span>
            </div>
            <div className="bg-muted flex items-center justify-between rounded-md p-3">
              <span className="text-muted-foreground text-sm font-medium">
                Melhor Mês:
              </span>
              <span className="text-primary md:text-lg font-bold">
                {bestMonth.mes} ({bestMonth.quantidade})
              </span>
            </div>
            <div className="bg-muted flex items-center justify-between rounded-md p-3">
              <span className="text-muted-foreground text-sm font-medium">
                Pior Mês:
              </span>
              <span className="text-primary md:text-lg font-bold">
                {worstMonth.mes} ({worstMonth.quantidade})
              </span>
            </div>
            {salesTrend && (
              <div className="bg-muted flex items-center justify-between rounded-md p-3">
                <span className="text-muted-foreground text-sm font-medium">
                  Tendência:
                </span>
                <span className="text-primary flex items-center gap-1 md:*:text-lg font-bold">
                  {salesTrend === "up" && (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  )}
                  {salesTrend === "down" && (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  {salesTrend === "stable" && "Estável"}
                  {salesTrend === "up" && "Crescimento"}
                  {salesTrend === "down" && "Queda"}
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
