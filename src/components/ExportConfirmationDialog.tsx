import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { exportChartAsSvg } from "@/utils/exportChartAsSvg";

interface ExportConfirmationDialogProps {
  svgElementId: string;
  filename: string;
  children: React.ReactNode;
}

export function ExportConfirmationDialog({
  svgElementId,
  filename,
  children,
}: ExportConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmExport = () => {
    exportChartAsSvg(svgElementId, filename);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exportação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja exportar o gráfico atual como um arquivo SVG?
            O arquivo será salvo como: <span className="font-bold">{filename}.svg</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirmExport}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
