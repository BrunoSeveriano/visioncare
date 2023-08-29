import React from "react";
import { writeFile } from "fs";
import Button from "./Button";

type ExportToCSVProps = {
  rows: any;
  className?: string;
  label: string;
  disabled?: boolean;
};

const ExportToCSV = ({
  rows,
  label,
  className,
  disabled,
}: ExportToCSVProps) => {
  const exportCSV = () => {
    const csvData = rows.map((row: any) =>
      Object.values(row)
        .map((value: any) => `"${value}"`)
        .join(",")
    );

    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tableData.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      customClass={`${className} p-5`}
      label={label}
      onClick={exportCSV}
      disabled={disabled}
    />
  );
};

export default ExportToCSV;
