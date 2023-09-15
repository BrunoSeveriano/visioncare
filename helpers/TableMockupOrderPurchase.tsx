import ButtonSwiftPartiner from "@/components/button/ButtonSwiftPartiner";
import ExportToTxt from "@/components/button/ExportToTxt";
import { format } from "date-fns";

export interface Rows {
  id: string;
  solicitationDate: string;
  codeSap: string;
  partnerName: string;
  partnerCnpj: string;
  partnerEmail: string;
  orderPurchase: string;
  isConfirmed: string;
}

export const TableMockupOrderPurchase: TableData = {
  columns: [
    {
      field: "solicitationDate",
      headerName: "Data/Solicitação",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => {
        const formattedDate = format(new Date(params.value), "dd/MM/yyyy");
        return <div>{formattedDate}</div>;
      },
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
      field: "codeSap",
      headerName: "SAP",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "partnerName",
      headerName: "Cliente",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "partnerCnpj",
      headerName: "CNPJ",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "partnerEmail",
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
          <ExportToTxt
            params={params}
            label="Baixar"
            fileName="arquivo.txt"
            className="w-full bg-careDarkBlue border-careDarkBlue p-2 py-2"
          />
        </div>
      ),
    },
    {
      field: "isConfirmed",
      headerName: "Confirmar",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonSwiftPartiner params={params} />
        </div>
      ),
    },
  ],

  rows: [
    {
      id: "1",
      solicitationDate: format(new Date(), "dd/MM/yyyy"),
      codeSap: "123456",
      partnerName: "João da Silva",
      partnerCnpj: "123.456.789-10",
      partnerEmail: "",
      orderPurchase: "",
      isConfirmed: "",
    },
  ],
};
