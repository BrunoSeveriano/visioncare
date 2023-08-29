import ButtonAttendanceCancel from "@/components/button/ButtonAttendanceCancel";
import ButtonAttendanceConfirmation from "@/components/button/ButtonAttendanceConfirmation";
import ButtonSwift from "@/components/button/ButtonSwift";
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
        <div className={`w-full`}>
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
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          <ButtonAttendanceConfirmation params={params} disableHover />
          <ButtonSwift params={params} />
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
