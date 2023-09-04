import ButtonEditPacient from "@/components/button/ButtonEditPacient";
import { format } from "date-fns";

export interface Rows {
  id: string;
  data: string;
  sap: string;
  client: string;
  cnpj: string;
  email: string;
  orderPurchase: string;
  confirm: string;
}

export const TableMockupOrderPurchase: TableData = {
  columns: [
    {
      field: "data",
      headerName: "Data/Solicitação",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
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
      field: "sap",
      headerName: "SAP",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "client",
      headerName: "Cliente",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "orderPurchase",
      headerName: "Pedido de Compra",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonEditPacient
            label="Baixar"
            customClass="bg-careDarkBlue border-careDarkBlue w-full py-2 text-sm"
          />
        </div>
      ),
    },
    {
      field: "confirm",
      headerName: "Confirmar",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
  ],

  rows: [
    {
      id: "string;",
      data: "string;",
      sap: "string;",
      client: "string;",
      cnpj: "string;",
      email: "string;",
      orderPurchase: "string;",
      confirm: "string;",
    },
    {
      id: "string;",
      data: "string;",
      sap: "string;",
      client: "string;",
      cnpj: "string;",
      email: "string;",
      orderPurchase: "string;",
      confirm: "string;",
    },
    {
      id: "string;",
      data: "string;",
      sap: "string;",
      client: "string;",
      cnpj: "string;",
      email: "string;",
      orderPurchase: "string;",
      confirm: "string;",
    },
    {
      id: "string;",
      data: "string;",
      sap: "string;",
      client: "string;",
      cnpj: "string;",
      email: "string;",
      orderPurchase: "string;",
      confirm: "string;",
    },
  ],
};
