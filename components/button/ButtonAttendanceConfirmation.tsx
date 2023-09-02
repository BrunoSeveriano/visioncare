import useCancelAttendance from "@/hooks/useCancelAttendance";
import useClientColors from "@/hooks/useClientConfiguration";
import useDataStorage from "@/hooks/useDataStorage";
import { confirmVisitAttendance } from "@/services/diagnostic";
import { IconType } from "react-icons";
import React, { useEffect, useState } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  customClass?: string;
  customColor?: string;
  isLoading?: boolean;
  disableHover?: boolean;
  params?: any;
}

const ButtonAttendanceConfirmation = ({
  label,
  onClick,
  params,
  disabled,
  icon: Icon,
  type,
  customClass,
  customColor,
  isLoading,
  disableHover,
}: ButtonProps) => {
  const dataScheduling = useDataStorage();
  const hideButtonHook = useCancelAttendance();

  const handleConfirmation = () => {
    const idVisit = {
      originEntityId: params.row.visitId,
    };
    confirmVisitAttendance(idVisit).then((response) => {
      dataScheduling.setRefresh(!dataScheduling.refresh);
    });
  };

  return (
    <>
      {params?.row?.attendanceStatus !== "Comparecimento cancelado" ? (
        <button
          onClick={() => {
            onClick && onClick();
            dataScheduling.setIdSchedule(params.row.visitId);
            handleConfirmation();
          }}
          disabled={disabled}
          className={`relative disabled:bg-gray-500 disabled:border-gray-500 disabled:opacity-70  border-2 z-0 text-md disabled:cursor-not-allowed rounded-lg  transition ${
            disableHover ? "" : "hover:opacity-80"
          }
       ${
         params?.row?.attendanceStatus === "Não compareceu"
           ? "bg-careRedButton border-careRedButton w-full md:w-40 py-2 text-sm"
           : "bg-careGreen border-careGreen w-full md:w-40 py-2 text-sm"
       }
     `}
          type={type}
        >
          {Icon && <Icon size={24} className="absolute left-4 top-3" />}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-6 w-6 opacity-70 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className={`uppercase ${customColor}`}>
              {params?.row?.attendanceStatus === "Não compareceu"
                ? "Não compareceu"
                : "Confirmado"}
            </div>
          )}
        </button>
      ) : null}
    </>
  );
};

export default ButtonAttendanceConfirmation;
