import Button from "@/components/button/Button";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";

export interface Rows {
  date: string;
  pacient: string;
  number: number;
  status: string;
  confirmation: string;
  switch: string;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  left: 10,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#753BBD" : "#753BBD",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#753BBD",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#9AA2AC" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const TableAttendanceConfirmation: TableData = {
  columns: [
    {
      field: "date",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "pacient",
      headerName: "Paciente",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "number",
      headerName: "Número",
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
      headerClassName: "columnTitle",
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
      headerName: "Confirmar comparecimento",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
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
    {
      field: "switch",
      headerName: "",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div>
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
            label=""
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
      switch: "",
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
