import { motion } from "framer-motion";
import { ProductsComparisonSection } from "../components/ProductsComparisonSection";

export function ProductsComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 p-4"
    >
      <h1 className="text-foreground mb-4 text-2xl md:text-3xl font-bold">
        Comparar Produtos
      </h1>
      <ProductsComparisonSection />
    </motion.div>
  );
}
