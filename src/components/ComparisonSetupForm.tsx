import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectAllProductNames } from "../store/slices/productSlice";
import {
  selectComparisonProduct1,
  selectComparisonProduct2,
  setComparisonProduct1,
  setComparisonProduct2,
} from "../store/slices/filterSlice";
import { motion } from "framer-motion";

interface ComparisonSetupFormProps {
  onCompare: () => void;
}

export function ComparisonSetupForm({ onCompare }: ComparisonSetupFormProps) {
  const dispatch = useAppDispatch();
  const allProductNames = useAppSelector(selectAllProductNames);
  const product1Name = useAppSelector(selectComparisonProduct1);
  const product2Name = useAppSelector(selectComparisonProduct2);

  const handleProduct1Change = (value: string) => {
    dispatch(setComparisonProduct1(value || null));
  };

  const handleProduct2Change = (value: string) => {
    dispatch(setComparisonProduct2(value || null));
  };

  const isCompareButtonEnabled =
    product1Name && product2Name && product1Name !== product2Name;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} 
      className="flex flex-col gap-8 md:flex-row"
    >
      <Card className="w-full max-w-lg rounded-lg p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground text-center text-xl font-semibold">
            Selecione Produtos para Comparar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product1-select"
                className="text-muted-foreground text-sm"
              >
                Produto 1:
              </label>
              <Select
                onValueChange={handleProduct1Change}
                value={product1Name || ""}
              >
                <SelectTrigger id="product1-select" className="w-[180px]">
                  <SelectValue placeholder="Selecione P1" />
                </SelectTrigger>
                <SelectContent>
                  {allProductNames.map((name) => (
                    <SelectItem
                      key={`p1-${name}`}
                      value={name}
                      disabled={name === product2Name}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-muted-foreground text-2xl font-bold">X</p>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="product2-select"
                className="text-muted-foreground text-sm"
              >
                Produto 2:
              </label>
              <Select
                onValueChange={handleProduct2Change}
                value={product2Name || ""}
              >
                <SelectTrigger id="product2-select" className="w-[180px]">
                  <SelectValue placeholder="Selecione P2" />
                </SelectTrigger>
                <SelectContent>
                  {allProductNames.map((name) => (
                    <SelectItem
                      key={`p2-${name}`}
                      value={name}
                      disabled={name === product1Name}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={onCompare} disabled={!isCompareButtonEnabled}>
              Comparar Produtos
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
