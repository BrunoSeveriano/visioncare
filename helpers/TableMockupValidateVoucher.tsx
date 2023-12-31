import React, { useState } from "react";
import ButtonEcpVoucher from "@/components/button/ButtonEcpVoucher";
import useDataStorage from "@/hooks/useDataStorage";
import ButtonValidateVoucherEcp from "@/components/button/ButtonValidateVoucherEcp";

export interface Rows {
  id: string;
  discountType: string;
  deadlineInDays: number;
  discountValue: number;
  statusRescue: string;
  status: string;
}

export const TableMockupValidateVoucher: TableData = {
  columns: [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "discountType",
      headerName: "Serviço",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "deadlineInDays",
      headerName: "Prazo",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: { value: any }) => `${params.value} dias`,
    },
    {
      field: "discountValue",
      headerName: "Valor",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: { value: any }) => `${params.value}%`,
    },
    {
      field: "status",
      headerName: "",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          {params.value === "6b820a03-0da0-4e09-8948-452e4eadac1c" && (
            <ButtonEcpVoucher
              disableHover
              label="Resgatado"
              customClass="bg-careYellow border-careYellow w-full py-2 text-sm"
            />
          )}
        </div>
      ),
    },
    {
      field: "voucherRescue",
      headerName: "Ações",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className={`w-full`}>
            <ButtonValidateVoucherEcp
              disableHover
              params={params.row.id}
              label="Utilizar"
            />
          </div>
        );
      },
    },
  ],

  rows: [
    {
      id: "1",
      voucherRescue: "Utilizar",
      status: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      deadlineInDays: "30 dias",
      discountValue: "R$ 100,00",
      discountType: "COMBO LEVE 4 PAGUE 3",
    },
  ],
};
