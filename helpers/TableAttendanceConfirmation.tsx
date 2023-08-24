import ButtonAttendanceConfirmation from "@/components/button/ButtonAttendanceConfirmation";
import {
  cancelVisitAttendance,
  confirmVisitAttendance,
  patientNotAttended,
} from "@/services/diagnostic";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface Rows {
  scheduleDateStart: string;
  patientName: string;
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
        backgroundColor: theme.palette.mode === "dark" ? "#3e0385" : "#3e0385",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#3e0385",
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
          <ButtonAttendanceConfirmation
            disableHover
            label="Ver mais"
            customClass="bg-careDarkBlue border-careDarkBlue w-full md:w-40 py-2 text-sm"
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
      renderCell: (params: any) => {
        const initialState = {
          isConfirmed:
            localStorage.getItem(`isConfirmed_${params.row.visitId}`) ===
            "true",
        };

        const initialStateCancel = {
          showButtons:
            localStorage.getItem(`showButtons_${params.row.visitId}`) ===
            "true",
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isConfirmed, setIsConfirmed] = useState(
          initialState.isConfirmed
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showButtons, setShowButtons] = useState(
          initialStateCancel.showButtons
        );

        const handleCancelClick = () => {
          const idVisit = {
            originEntityId: params.row.visitId,
          };
          cancelVisitAttendance(idVisit).then((response) => {
            toast.success("Comparecimento do paciente cancelado efetivamente!");
            setShowButtons(false);
            localStorage.setItem(`showButtons_${params.row.visitId}`, "false");
          });
        };

        const handleConfirmation = () => {
          const idVisit = {
            originEntityId: params.row.visitId,
          };
          confirmVisitAttendance(idVisit).then((response) => {
            toast.success("Comparecimento do paciente confirmado!");
            setIsConfirmed(true);
            localStorage.setItem(`isConfirmed_${params.row.visitId}`, "true");
          });
        };

        const handleSwitchClick = () => {
          const idVisit = {
            originEntityId: params.row.visitId,
          };
          patientNotAttended(idVisit).then((response) => {
            toast.error("Paciente não compareceu!");
            setIsConfirmed(false);
            localStorage.setItem(`isConfirmed_${params.row.visitId}`, "false");
          });
        };

        return (
          <div className={`w-full flex gap-2`}>
            <ButtonAttendanceConfirmation
              onClick={handleCancelClick}
              params={params.row.visitId}
              disableHover
              label="Cancelar"
              customClass="border-careDarkBlue w-full md:w-40 py-2 text-sm text-careDarkBlue"
            />
            {showButtons && (
              <>
                <ButtonAttendanceConfirmation
                  onClick={handleConfirmation}
                  params={params.row.visitId}
                  disableHover
                  label={isConfirmed ? "Confirmado" : "Não compareceu"}
                  customClass={
                    isConfirmed
                      ? "bg-careGreen border-careGreen w-full md:w-36 w-full py-2 text-sm"
                      : "bg-careOrange border-careOrange w-full md:w-36 w-full py-2 text-sm"
                  }
                />
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={isConfirmed}
                      onClick={handleSwitchClick}
                    />
                  }
                  label=""
                />
              </>
            )}
          </div>
        );
      },
    },
  ],

  rows: [
    {
      scheduleDateStart: "18/10/2021",
      patientName: "Maria da Silva",
      visitId: "unique_id_1",
    },
  ],
};
