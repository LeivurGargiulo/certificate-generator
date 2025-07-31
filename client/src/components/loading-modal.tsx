import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

const LoadingModal = ({ 
  isOpen = false, 
  title = "Generando Certificado",
  message = "Por favor espera mientras creamos tu certificado..."
}: LoadingModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-slate-600 mt-2">{message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
