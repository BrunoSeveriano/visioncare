import Button from "@/components/button/Button";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";

export interface Rows {
  product: string;
  balance: string;
}

export const TableProductreimbursement: TableData = {
  columns: [
    {
      field: "productName",
      headerName: "Produto",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Saldo",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
  ],
  rows: [
    {
      product: "10/10/2021",
      balance: "Maria da Silva",
    },
  ],
};
