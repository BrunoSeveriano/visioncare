import React from "react";
import { utils, writeFileXLSX } from "xlsx";
import Button from "./Button";

type ExportToExcelProps = {
  rows: any;
  className?: string;
  label: string;
  disabled?: boolean;
};

const ExportToExcel = ({
  rows,
  label,
  className,
  disabled,
}: ExportToExcelProps) => {
  const exportXlsx = () => {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(rows));
    writeFileXLSX(wb, "tableData.xlsx");
  };

  return (
    <Button
      customClass={`${className} p-5`}
      label={label}
      onClick={exportXlsx}
      disabled={disabled}
    />
  );
};

export default ExportToExcel;
