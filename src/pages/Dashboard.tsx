import { motion } from "framer-motion";
import { ProductDetailsSection } from "@/components/ProductDetailsSection";
import { ProductSalesSection } from "@/components/ProductSalesSection";

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-foreground text-2xl md:text-3xl font-bold">
            Dashboard
          </h1>
        </div>
        <main className="flex flex-col gap-8">
          <ProductSalesSection />
          <ProductDetailsSection />
        </main>
      </div>
    </motion.div>
  );
}
