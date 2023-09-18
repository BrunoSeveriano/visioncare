import ButtonAttendanceCancel from "@/components/button/ButtonAttendanceCancel";
import ButtonAttendanceConfirmation from "@/components/button/ButtonAttendanceConfirmation";
import ButtonViewMore from "@/components/button/ButtonViewMore";
import { format } from "date-fns";

export interface Rows {
  scheduleDateStart: string;
  patientName: string;
}

export const TableAttendanceConfirmation: TableData = {
  columns: [
    {
      field: "scheduleDateStart",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
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
            <span className="text-sm text-careLightBlue">{formattedTime}</span>
          </div>
        );
      },
    },
    {
      field: "patientName",
      headerName: "Paciente",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },

    {
      field: "friendlyCode",
      headerName: "Número",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Ações",
      headerAlign: "",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonViewMore
            params={params}
            disableHover
            label="Ver mais"
            customClass="bg-careDarkBlue border-careDarkBlue w-full md:w-40 py-2 text-sm"
          />
        </div>
      ),
    },
    {
      field: "cancel",
      headerName: "",
      headerAlign: "",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div>
          <ButtonAttendanceCancel
            params={params.row.visitId}
            disableHover
            label="Cancelar"
            customClass="bg-white border-careDarkBlue text-careDarkBlue w-full md:w-40 py-2 text-sm"
          />
        </div>
      ),
    },
    {
      field: "confirmation",
      headerName: "Confirmar comparecimento",
      headerAlign: "",
      minWidth: 250,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div>
          <ButtonAttendanceConfirmation params={params} disableHover />
        </div>
      ),
    },
  ],

  rows: [
    {
      scheduleDateStart: "18/10/2021",
      patientName: "Maria da Silva",
    },
  ],
};
