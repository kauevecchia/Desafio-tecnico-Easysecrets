import { useState } from "react";
import { ComparisonSetupForm } from "./ComparisonSetupForm";
import { ComparisonResults } from "./ComparisonResults";
import { useAppDispatch } from "../store/hooks";
import { resetAllFilters } from "../store/slices/filterSlice";
import { toast } from "sonner";

export function ProductsComparisonSection() {
  const [showComparisonResults, setShowComparisonResults] = useState(false);
  const dispatch = useAppDispatch();

  const handleCompare = () => {
    setShowComparisonResults(true);
    toast.success("Comparação realizada com sucesso!")
  };

  const handleNewComparison = () => {
    setShowComparisonResults(false);
    dispatch(resetAllFilters());
  };

  return (
    <>
      {!showComparisonResults ? (
        <ComparisonSetupForm onCompare={handleCompare} />
      ) : (
        <ComparisonResults onNewComparison={handleNewComparison} />
      )}
    </>
  );
}
