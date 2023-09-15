import useDataStorage from "@/hooks/useDataStorage";
import { IconType } from "react-icons";
import React, { useState } from "react";
import { isConfirmed } from "@/services/partiner";
import Switch from "@mui/material/Switch";
import { MdClose } from "react-icons/md";
const label = { inputProps: { "aria-label": "Switch demo" } };

interface ButtonProps {
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

const ButtonSwiftPartiner = ({ onClick, params }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataScheduling = useDataStorage();

  const handleConfirmClick = () => {
    setIsLoading(true);
    const idVisit = {
      purchaseId: params.row.id,
    };
    isConfirmed(idVisit)
      .then((response) => {
        dataScheduling.setRefresh(!dataScheduling.refresh);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const iconColorClass = params?.row?.isConfirmed
    ? "text-blue-500"
    : "text-red-500";

  return (
    <>
      {params?.row?.isConfirmed === true ? (
        <div className="flex items-center">
          <Switch
            {...label}
            checked={params?.row?.isConfirmed}
            onClick={() => {
              onClick && onClick();
              handleConfirmClick();
            }}
          />
          {params?.row?.isConfirmed ? (
            <div
              onClick={handleConfirmClick}
              className="cursor-pointer bg-careDarkBlue rounded-full text-white p-1 h-5 w-5 flex items-center justify-center"
            >
              <MdClose size={20} />
            </div>
          ) : (
            <div className=" bg-careRedButton rounded-full text-white p-1 h-5 w-5 flex items-center justify-center">
              <MdClose size={20} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <Switch
            {...label}
            checked={params?.row?.isConfirmed}
            onClick={() => {
              onClick && onClick();
              handleConfirmClick();
            }}
          />
          {params?.row?.isConfirmed ? (
            <div
              onClick={handleConfirmClick}
              className="cursor-pointer bg-careDarkBlue rounded-full text-white p-1 h-5 w-5 flex items-center justify-center"
            >
              <MdClose size={20} />
            </div>
          ) : (
            <div className=" bg-careRedButton rounded-full text-white p-1 h-5 w-5 flex items-center justify-center">
              <MdClose size={20} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ButtonSwiftPartiner;
