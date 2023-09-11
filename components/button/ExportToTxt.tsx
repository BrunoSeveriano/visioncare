import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import useDataStorage from "@/hooks/useDataStorage";
import { getProductTxt } from "@/services/partiner";

type ExportToTxtProps = {
  label: string;
  className?: string;
  disabled?: boolean;
  fileName: string;
  params?: any;
};

const downloadTxtFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const ExportToTxt = ({
  label,
  className,
  disabled,
  fileName,
  params,
}: ExportToTxtProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataScheduling = useDataStorage();

  const getProduct = (partnerName: string) => {
    setIsLoading(true);
    getProductTxt(params.row.id)
      .then((response) => {
        dataScheduling.setRefresh(!dataScheduling.refresh);
        setIsLoading(false);
        if (response.value) {
          downloadTxtFile(response.value, `${partnerName}.txt`);
        } else {
          toast.error("Não foi encontrado nenhum produto");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Erro ao exportar arquivo");
      });
  };

  return (
    <Button
      customClass={`${className}`}
      label={label}
      onClick={() => getProduct(params.row.partnerName)}
      disabled={disabled || isLoading}
    />
  );
};

export default ExportToTxt;
