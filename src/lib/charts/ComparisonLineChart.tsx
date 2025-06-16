import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ComparisonChartDataPoint {
  mes: string;
  [key: string]: string | number;
}

interface ChartLineDefinition {
  dataKey: string;
  color: string;
}

interface ComparisonLineChartProps {
  data: ComparisonChartDataPoint[];
  lines: ChartLineDefinition[];
  chartKey: string;
}

export function ComparisonLineChart({
  data,
  lines,
  chartKey,
}: ComparisonLineChartProps) {
  const [shouldRenderChart, setShouldRenderChart] = useState(false);

  useEffect(() => {
    setShouldRenderChart(false);
    const timer = setTimeout(() => {
      setShouldRenderChart(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [chartKey]);

  if (!data || data.length === 0 || !lines || lines.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center text-center">
        <p className="font-semibold opacity-50">
          Dados insuficientes para exibir a comparação de vendas.
        </p>
      </div>
    );
  }

  return (
    shouldRenderChart ? (
      <ResponsiveContainer height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis
            dataKey="mes"
            tickFormatter={(tick) => tick.substring(0, 3)}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "black" }}
            formatter={(value: number, name: string) => [
              `${value} unidades`,
              name,
            ]}
            labelFormatter={(label: string) => `Mês: ${label}`}
          />
          <Legend />
          {lines.map((lineDef) => (
            <Line
              key={lineDef.dataKey}
              type="monotone"
              dataKey={lineDef.dataKey}
              stroke={lineDef.color}
              strokeWidth={3}
              dot={{ fill: lineDef.color, strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                stroke: lineDef.color,
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <div className="text-muted-foreground flex h-full items-center justify-center text-center">
        <p className="font-semibold opacity-50">Carregando gráfico...</p>
      </div>
    )
  );
}
