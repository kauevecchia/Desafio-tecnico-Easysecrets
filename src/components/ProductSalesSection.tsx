import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectAllProductsData,
} from "@/store/slices/productSlice";
import { type ProductData } from "@/data/salesData";
import {
  selectDashboardSelectedMonth,
  setDashboardSelectedMonth,
} from "@/store/slices/filterSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MONTHS } from "@/data/salesData";
import { SalesPieChart, type PieChartData } from "@/lib/charts/SalesPieChart";
import { ProductsScoreboard } from "./ProductsScoreboard";

const PIE_CHART_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];
const ANIMATION_DURATION = 800;

export function ProductSalesSection() {
  const dispatch = useAppDispatch();
  const allProductsData: ProductData[] = useAppSelector(selectAllProductsData);
  const selectedMonth: string | "all" = useAppSelector(
    selectDashboardSelectedMonth,
  );

  const processDataForPieChart = (
    products: ProductData[],
    monthFilter: string | "all",
  ): PieChartData[] => {
    return products.map((product) => {
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
      return {
        name: product.produto,
        value: totalSales,
      };
    });
  };

  const chartData = processDataForPieChart(allProductsData, selectedMonth);

  const handleMonthChange = (value: string) => {
    dispatch(setDashboardSelectedMonth(value as string | "all"));
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    value,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const index = chartData.findIndex((d) => d.name === name);

    return (
      <text
        x={x}
        y={y}
        fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-semibold sm:text-sm"
      >
        {`${value} vendas (${(percent * 100).toFixed(2)}%)`}
      </text>
    );
  };

  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <Card className="flex min-h-[400px] w-full flex-col md:w-2/3">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <CardTitle className="text-foreground text-xl font-semibold">
              Vendas por Produto
            </CardTitle>
            <div className="flex items-center gap-2">
              <label
                htmlFor="month-select"
                className="text-muted-foreground text-sm"
              >
                Mês:
              </label>
              <Select onValueChange={handleMonthChange} value={selectedMonth}>
                <SelectTrigger
                  id="month-select"
                  className="w-[165px] md:w-[200px]"
                >
                  <SelectValue placeholder="Selecione o Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Meses</SelectItem>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          {chartData.filter((item) => item.value > 0).length > 0 ? (
            <SalesPieChart
              data={chartData}
              colors={PIE_CHART_COLORS}
              animationDuration={ANIMATION_DURATION}
              renderLabel={renderCustomizedLabel}
              chartKey={selectedMonth}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center text-center">
              <p className="font-semibold opacity-50">
                Nenhum dado disponível para o gráfico.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="w-full md:w-1/3">
        <ProductsScoreboard />
      </div>
    </section>
  );
}
