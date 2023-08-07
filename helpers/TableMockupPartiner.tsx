import ButtonEditPartiner from "@/components/button/ButtonEditPartiner";
import ButtonEditVoucher from "@/components/button/ButtonEditVoucher";
import { format } from "date-fns";

export interface Rows {
  createdOn: string;
  friendlyCode: string;
  mainContact: string;
  emailAddress: string;
  cnpj: string;
  actions: string;
}

export const TableMockupPartiner: TableData = {
  columns: [
    {
      field: "createdOn",
      headerName: "Data do Cadastro",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle-borderLeft",
      sortable: false,
      renderCell: (params: any) => {
        const formattedDate = format(new Date(params.value), "dd/MM/yyyy");
        return (
          <div
            style={{
              paddingLeft: "5px",
            }}
          >
            {formattedDate}
          </div>
        );
      },
    },
    {
      field: "friendlyCode",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      minWidth: 95,
    },
    {
      field: "mainContact",
      headerName: "Cliente",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "emailAddress",
      headerName: "Email",
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
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle-borderRight",
      sortable: false,
      minWidth: 95,
      flex: 1,

      renderCell: (params: any) => (
        <div className="w-full">
          <ButtonEditPartiner
            data={params.row}
            disableHover
            label="Ver mais"
            customClass="bg-careDarkBlue border-careDarkBlue w-full py-2 text-sm"
          />
        </div>
      ),
    },
  ],

  rows: [
    {
      createdOn: "29/11/2021",
      friendlyCode: "0001",
      mainContact: "João da Silva",
      emailAddress: "João da Silva",
      cnpj: "João da Silva",
      actions: "João da Silva",
    },
  ],
};
