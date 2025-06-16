import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesDataPoint {
  mes: string;
  quantidade: number;
}

interface ProductLineChartProps {
  data: SalesDataPoint[];
  lineColor: string;
  svgId: string;
}

export function ProductLineChart({ data, lineColor, svgId }: ProductLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center text-center">
        <p className="font-semibold opacity-50">
          Nenhum dado disponível para o gráfico de linha.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer height={300}>
      <LineChart
        id={svgId}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
        <XAxis dataKey="mes" tickFormatter={(value) => value.slice(0, 3)}  />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "black" }}
          itemStyle={{ color: "black" }}
          formatter={(value: number, _) => [`${value} unidades`, "Vendas"]}
          labelFormatter={(label: string) => `Mês: ${label}`}
          cursor={{
            stroke: lineColor,
            strokeWidth: 2,
            strokeDasharray: "3 3",
          }}
        />
        <Line
          type="monotone"
          dataKey="quantidade"
          stroke={lineColor}
          strokeWidth={3}
          dot={{ fill: lineColor, strokeWidth: 2, r: 6 }}
          activeDot={{
            r: 8,
            stroke: lineColor,
            strokeWidth: 2,
          }}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
