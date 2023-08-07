import ButtonEditPacient from "@/components/button/ButtonEditPacient";
import { format } from "date-fns";

export interface Rows {
  createdOn: string;
  name: string;
  cpf: number;
  email: number;
  status: string;
}

export const TableMockupAllPacient: TableData = {
  columns: [
    {
      field: "createdOn",
      headerName: "Data do Cadastro",
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
      field: "name",
      headerName: "Cliente",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "cpf",
      headerName: "CPF",
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
      field: "status",
      headerName: "Ações",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonEditPacient
            disableHover
            label="Ver mais"
            disabled={true}
            customClass="bg-careGreen border-careGreen w-full py-2 text-sm"
          />
        </div>
      ),
    },
  ],

  rows: [
    {
      createdOn: "20f3c61b-128c-4f11-9e5b-0fc47677f489",
      name: "30 dias",
      cpf: "R$ 100,00",
      email: "R$ 100,00",
      status: "ATIVO",
    },
  ],
};
