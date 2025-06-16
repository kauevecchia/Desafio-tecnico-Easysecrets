import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export interface PieChartData {
  name: string;
  value: number;
}

interface SalesPieChartProps {
  data: PieChartData[];
  colors: string[];
  animationDuration?: number;
  renderLabel?: ((props: any) => React.ReactNode) | boolean;
  chartKey: string;
}

export function SalesPieChart({
  data,
  colors,
  animationDuration = 800,
  renderLabel,
  chartKey,
}: SalesPieChartProps) {
  const filteredData = data.filter((item) => item.value > 0);

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="border-border bg-muted flex min-h-[300px] w-full items-center justify-center rounded-md border">
        <p className="text-accent-foreground font-semibold opacity-50">
          Nenhum dado disponível para o gráfico.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer height={300} key={chartKey}>
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          paddingAngle={6}
          strokeWidth={0}
          label={renderLabel}
          isAnimationActive={true}
          animationDuration={animationDuration}
        >
          {filteredData.map((_, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              className="stroke-muted"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "black" }}
          itemStyle={{ color: "black" }}
          formatter={(value: number, name: string) => [`${value} vendas`, name]}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ paddingTop: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
