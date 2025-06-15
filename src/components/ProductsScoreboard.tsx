import { useAppSelector } from "../store/hooks";
import {
  selectAllProductsData,
} from "../store/slices/productSlice";
import { type ProductData } from "../data/salesData";
import { selectDashboardSelectedMonth } from "../store/slices/filterSlice";
import { cn } from "@/lib/utils";

interface ProductSalesSummary {
  name: string;
  totalSales: number;
}

export function ProductsScoreboard() {
  const allProductsData: ProductData[] = useAppSelector(selectAllProductsData);
  const selectedMonth: string | "all" = useAppSelector(
    selectDashboardSelectedMonth,
  );

  const calculateProductSummaries = (
    products: ProductData[],
    monthFilter: string | "all",
  ): ProductSalesSummary[] => {
    return products
      .map((product) => {
        let totalSales = 0;
        if (monthFilter === "all") {
          totalSales = product.vendas.reduce(
            (sum, sale) => sum + sale.quantidade,
            0,
          );
        } else {
          const saleForMonth = product.vendas.find(
            (sale) => sale.mes === monthFilter,
          );
          totalSales = saleForMonth ? saleForMonth.quantidade : 0;
        }
        return { name: product.produto, totalSales };
      })
      .sort((a, b) => b.totalSales - a.totalSales);
  };

  const productSummaries = calculateProductSummaries(
    allProductsData,
    selectedMonth,
  );

  const totalSalesAllProducts = productSummaries.reduce(
    (sum, item) => sum + item.totalSales,
    0,
  );

  return (
    <div className="bg-card md:h-full w-full rounded-lg p-6 shadow-md">
      <h2 className="text-foreground mb-4 text-xl font-semibold">
        Placar de Vendas
      </h2>
      <div className="p-4">
        <ul className="space-y-3">
          {productSummaries.map((item, index) => {
            const barWidth = totalSalesAllProducts
              ? (item.totalSales / totalSalesAllProducts) * 100
              : 0;

            const rankColors = [
              "text-yellow-500",
              "text-gray-400",
              "text-orange-500",
            ];

            return (
              <li key={item.name} className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-6 text-center text-lg font-semibold",
                    rankColors[index] || "text-muted-foreground",
                  )}
                >
                  {index + 1}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground font-medium">{item.name}</p>
                    <div className="text-muted-foreground min-w-[30px] text-right text-sm font-medium">
                      {item.totalSales} <span className="hidden md:inline">vendas</span> ({barWidth.toFixed(2)}%)
                    </div>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {productSummaries.length === 0 && (
          <div className="text-muted-foreground py-4 text-center">
            Nenhum dado de vendas para exibir.
          </div>
        )}
      </div>
    </div>
  );

}
