import Button from "@/components/button/Button";

export interface Rows {
  date: string;
  pacient: string;
  number: number;
  status: string;
  confirmation: string;
}

export const TableScheduleManagement: TableData = {
  columns: [
    {
      field: "date",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
    {
      field: "pacient",
      headerName: "Paciente",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitleScheduleManagement",
      sortable: false,
      flex: 1,
    },
    {
      field: "number",
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
          <Button
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
          <Button
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
          <Button
            disableHover
            label="Confirmar"
            customClass="bg-careGreen border-careGreen w-full py-2 text-sm"
          />
        </div>
      ),
    },
  ],

  rows: [
    {
      date: "10/10/2021",
      pacient: "Maria da Silva",
      number: 10,
      status: "Pendente",
      confirmation: "",
    },
    {
      date: "10/10/2021",
      pacient: "Maria da Silva",
      number: 10,
      status: "Pendente",
      confirmation: "",
    },
    {
      date: "10/10/2021",
      pacient: "Maria da Silva",
      number: 10,
      status: "Pendente",
      confirmation: "",
    },
    {
      date: "10/10/2021",
      pacient: "Maria da Silva",
      number: 10,
      status: "Pendente",
      confirmation: "",
    },
    {
      date: "10/10/2021",
      pacient: "Maria da Silva",
      number: 10,
      status: "Pendente",
      confirmation: "",
    },
  ],
};
