import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ComparisonLineChart } from "../lib/charts/ComparisonLineChart";
import { ProductsComparisonInsights } from "./ProductsComparisonInsights";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAppSelector } from "../store/hooks";
import {
  selectProductDataByName,
} from "../store/slices/productSlice";
import {
  selectComparisonProduct1,
  selectComparisonProduct2,
} from "../store/slices/filterSlice";
import { MONTHS } from "../data/salesData";

import { Download } from "lucide-react";
import { ExportConfirmationDialog } from "./ExportConfirmationDialog";

const PRODUCT_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
];

interface ComparisonChartDataPoint {
  mes: string;
  [key: string]: string | number;
}

interface ChartLineDefinition {
  dataKey: string;
  color: string;
}

interface ComparisonResultsProps {
  onNewComparison: () => void;
}

export function ComparisonResults({ onNewComparison }: ComparisonResultsProps) {
  const product1Name = useAppSelector(selectComparisonProduct1);
  const product2Name = useAppSelector(selectComparisonProduct2);

  const product1Data = useAppSelector(selectProductDataByName(product1Name || ''));
  const product2Data = useAppSelector(selectProductDataByName(product2Name || ''));
  const allProductsFullData = useAppSelector(state => state.product.data);

  const [shouldRenderChart, setShouldRenderChart] = useState(false);

  useEffect(() => {
    setShouldRenderChart(false); 
    const timer = setTimeout(() => {
      setShouldRenderChart(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [product1Name, product2Name]);


  const getComparisonChartData = (): ComparisonChartDataPoint[] => {
    if (!product1Data && !product2Data) {
      return [];
    }

    const data: ComparisonChartDataPoint[] = [];

    MONTHS.forEach(month => {
      const monthData: ComparisonChartDataPoint = { mes: month };
      
      if (product1Data) {
        const sales1 = product1Data.vendas.find(s => s.mes === month)?.quantidade || 0;
        monthData[product1Data.produto] = sales1;
      }
      if (product2Data) {
        const sales2 = product2Data.vendas.find(s => s.mes === month)?.quantidade || 0;
        monthData[product2Data.produto] = sales2;
      }
      data.push(monthData);
    });

    return data;
  };

  const comparisonChartData = getComparisonChartData();

  const chartLines: ChartLineDefinition[] = [];
  
  if (product1Name && product1Data) {
      const p1Index = allProductsFullData.findIndex(p => p.produto === product1Name);
      chartLines.push({
          dataKey: product1Name,
          color: p1Index !== -1 ? PRODUCT_COLORS[p1Index % PRODUCT_COLORS.length] : '#8884d8'
      });
  }
  if (product2Name && product2Data) {
      const p2Index = allProductsFullData.findIndex(p => p.produto === product2Name);
      chartLines.push({
          dataKey: product2Name,
          color: p2Index !== -1 ? PRODUCT_COLORS[p2Index % PRODUCT_COLORS.length] : '#82ca9d'
      });
  }

  const chartKey = `${product1Name || 'null'}-${product2Name || 'null'}`;

  const COMPARISON_CHART_SVG_ID = "comparison-line-chart-svg";
  const COMPARISON_CHART_FILENAME = `comparacao-${product1Name?.replace(' ', '-') || 'produto1'}-vs-${product2Name?.replace(' ', '-') || 'produto2'}`;


  if (!product1Name || !product2Name) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center text-center">
        <p className="font-semibold opacity-50">
          Nenhum produto selecionado para comparação.
        </p>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 md:flex-row"
    >
      <Card className="w-full md:w-2/3 flex flex-col min-h-[400px]">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-xl font-semibold text-foreground">
              Gráfico de Vendas Comparativo
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {comparisonChartData.length > 0 && (
                <ExportConfirmationDialog svgElementId={COMPARISON_CHART_SVG_ID} filename={COMPARISON_CHART_FILENAME}>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </ExportConfirmationDialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          {shouldRenderChart && comparisonChartData.length > 0 ? (
            <ComparisonLineChart data={comparisonChartData} lines={chartLines} chartKey={chartKey} svgId={COMPARISON_CHART_SVG_ID} />
          ) : (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <p className="font-semibold opacity-50">
                {comparisonChartData.length === 0 && (product1Name || product2Name) 
                  ? "Dados insuficientes para exibir o gráfico de comparação." 
                  : "Carregando gráfico..."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <ProductsComparisonInsights />
        <Button onClick={onNewComparison} className="w-full">
          Fazer Nova Comparação
        </Button>
      </div>
    </motion.section>
  );
}
