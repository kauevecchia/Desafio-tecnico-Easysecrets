import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAppSelector } from "../store/hooks";
import {
  selectComparisonProduct1,
  selectComparisonProduct2,
} from "../store/slices/filterSlice";
import { selectProductDataByName } from "../store/slices/productSlice";
import { TrendingUp, TrendingDown, Equal, Crown } from "lucide-react";

export function ProductsComparisonInsights() {
  const product1Name = useAppSelector(selectComparisonProduct1);
  const product2Name = useAppSelector(selectComparisonProduct2);

  const product1Data = useAppSelector(
    selectProductDataByName(product1Name || ""),
  );
  const product2Data = useAppSelector(
    selectProductDataByName(product2Name || ""),
  );

  if (!product1Name || !product2Name) {
    return (
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="text-foreground text-xl font-semibold">
            Insights da Comparação
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-1 items-center justify-center text-center">
          <p className="font-semibold opacity-50">
            Selecione dois produtos para comparar.
          </p>
        </CardContent>
      </Card>
    );
  }

  let totalSales1 = 0;
  let totalSales2 = 0;
  let difference = 0;
  let percentageDifference = 0;
  let winner = "";
  let highestDifferenceMonth: { month: string; diff: number } | null = null;

  if (product1Data && product1Data.vendas.length > 0) {
    totalSales1 = product1Data.vendas.reduce(
      (sum, sale) => sum + sale.quantidade,
      0,
    );
  }
  if (product2Data && product2Data.vendas.length > 0) {
    totalSales2 = product2Data.vendas.reduce(
      (sum, sale) => sum + sale.quantidade,
      0,
    );
  }

  difference = totalSales1 - totalSales2;
  if (totalSales2 > 0) {
    percentageDifference = (difference / totalSales2) * 100;
  } else if (totalSales1 > 0 && totalSales2 === 0) {
    percentageDifference = 100;
  } else if (totalSales1 === 0 && totalSales2 === 0) {
    percentageDifference = 0;
  }

  if (totalSales1 > totalSales2) {
    winner = product1Name;
  } else if (totalSales2 > totalSales1) {
    winner = product2Name;
  } else {
    winner = "Empate";
  }

  if (product1Data && product2Data) {
    product1Data.vendas.forEach((sale1) => {
      const sale2 = product2Data.vendas.find((s) => s.mes === sale1.mes);
      if (sale2) {
        const monthDiff = sale1.quantidade - sale2.quantidade;
        if (
          !highestDifferenceMonth ||
          Math.abs(monthDiff) > Math.abs(highestDifferenceMonth.diff)
        ) {
          highestDifferenceMonth = { month: sale1.mes, diff: monthDiff };
        }
      }
    });
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-semibold">
          Insights da Comparação
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="bg-muted flex items-center justify-between rounded-md p-3">
          <span className="text-muted-foreground text-sm font-medium">
            Vendas Totais {product1Name}:
          </span>
          <span className="text-primary font-bold">{totalSales1} unidades</span>
        </div>
        <div className="bg-muted flex items-center justify-between rounded-md p-3">
          <span className="text-muted-foreground text-sm font-medium">
            Vendas Totais {product2Name}:
          </span>
          <span className="text-primary font-bold">{totalSales2} unidades</span>
        </div>

        <div className="bg-muted flex items-center justify-between rounded-md p-3">
          <span className="text-muted-foreground text-sm font-medium">
            Diferença Total:
          </span>
          <span
            className={`flex items-center gap-1 font-bold ${difference > 0 ? "text-green-500" : difference < 0 ? "text-red-500" : "text-foreground"}`}
          >
            {difference > 0 && <TrendingUp className="h-5 w-5" />}
            {difference < 0 && <TrendingDown className="h-5 w-5" />}
            {difference === 0 && <Equal className="h-5 w-5" />}
            {Math.abs(difference)} unidades ({percentageDifference.toFixed(0)}%)
          </span>
        </div>

        <div className="bg-muted flex items-center justify-between rounded-md p-3">
          <span className="text-muted-foreground text-sm font-medium">
            Vencedor Geral:
          </span>
          <span className="text-primary flex items-center gap-1 font-bold">
            {winner === product1Name && (
              <Crown className="h-5 w-5 text-yellow-500" />
            )}
            {winner === product2Name && (
              <Crown className="h-5 w-5 text-yellow-500" />
            )}
            {winner}
          </span>
        </div>

        {highestDifferenceMonth !== null && (
          <div className="bg-muted flex items-center justify-between gap-2 rounded-md p-3">
            <span className="text-muted-foreground text-sm font-medium">
              Maior Divergência:
            </span>
            <span className="text-primary flex items-center gap-1 text-sm font-bold md:text-base">
              {
                (highestDifferenceMonth as { month: string; diff: number })
                  .month
              }
              :{" "}
              {(highestDifferenceMonth as { month: string; diff: number })
                .diff > 0
                ? product1Name
                : product2Name}{" "}
              com{" "}
              {Math.abs(
                (highestDifferenceMonth as { month: string; diff: number })
                  .diff,
              )}{" "}
              unidades a mais
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
