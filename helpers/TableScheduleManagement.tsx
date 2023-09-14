import ButtonCancelScheduleManagement from "@/components/button/ButtonCancelScheduleManagement";
import ButtonConfimedScheduleManagement from "@/components/button/ButtonConfimedScheduleManagement";
import ButtonScheduleManagement from "@/components/button/ButtonConfimedScheduleManagement";
import ButtonViewMore from "@/components/button/ButtonViewMore";
import { format } from "date-fns";

export interface Rows {
  scheduleDateStart: string;
  name: string;
  friendlyCode: number;
  status: string;
  confirmation: string;
}

export const TableScheduleManagement: TableData = {
  columns: [
    {
      field: "scheduleDateStart",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => {
        const date = new Date(params.value);
        const formattedDate = format(date, "dd/MM/yyyy");
        const formattedTime = format(date, "HH:mm");
        return (
          <div className="flex flex-col items-center">
            {formattedDate}
            <br />
            <span className="text-sm">{formattedTime}</span>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Paciente",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
    {
      field: "friendlyCode",
      headerName: "Número",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Ações",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonViewMore
            params={params}
            disableHover
            label="Ver mais"
            customClass="bg-careDarkBlue border-careDarkBlue w-full py-2 text-sm"
          />
        </div>
      ),
    },
    {
      field: "cancel",
      headerName: "",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonCancelScheduleManagement
            params={params.row.visitId}
            disableHover
            label="Cancelar"
            customClass="border-careDarkBlue w-full py-2 text-sm text-careDarkBlue"
          />
        </div>
      ),
    },
    {
      field: "confirmation",
      headerName: "Confirmar agendamento?",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonConfimedScheduleManagement
            params={params.row.visitId}
            disableHover
            label="Confirmar"
            customClass="bg-careGreen border-careGreen text-white w-full py-2 text-sm"
          />
        </div>
      ),
    },
  ],

  rows: [
    {
      scheduleDateStart: "10/10/2021",
      name: "Maria da Silva",
      friendlyCode: 123456,
      status: "Agendado",
    },
  ],
};
