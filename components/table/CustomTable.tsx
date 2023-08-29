import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Rows } from "@/helpers/VoucherListTable";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

interface ICustomTableProps {
  rowId: string;
  columns: GridColDef[];
  rows: any[];
  handleEditVoucherRow?: (voucher: Rows) => void;
  isLoading?: boolean;
}

const CustomTable = ({
  columns,
  rows,
  rowId,
  isLoading,
  handleEditVoucherRow,
}: ICustomTableProps) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const validatedRows = Array.isArray(rows) ? rows : [];
  const validatedCurrentPage = currentPage || 1;

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return validatedRows.slice(
      startIndex,
      Math.min(endIndex, validatedRows.length)
    );
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleRowClick = (params: any) => {
    const selectedRowData = params.row;
    setSelectedRow(selectedRowData);

    if (handleEditVoucherRow) {
      handleEditVoucherRow(selectedRowData);
    }
  };

  return (
    <>
      <DataGrid
        rows={rows ? getCurrentPageData() : []}
        columns={columns}
        getRowId={(row) => (rowId ? row[rowId] : row.id)}
        autoHeight
        disableColumnMenu
        disableRowSelectionOnClick
        rowHeight={75}
        disableColumnFilter
        onRowClick={handleRowClick}
        loading={isLoading}
        sx={{
          "& .MuiDataGrid-row": {
            backgroundColor: "#F4F5F7",
            fontSize: "18px",
            color: "#051F4A",
            border: "none",
          },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
            {
              outline: "none !important",
            },
        }}
        components={{
          Footer: () => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                backgroundColor: "#F4F5F7",
                borderTop: "1px solid #E5E5E5",
              }}
            >
              <Pagination
                count={Math.ceil(validatedRows.length / pageSize)}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
              />
            </div>
          ),
        }}
      />
    </>
  );
};

export default CustomTable;
