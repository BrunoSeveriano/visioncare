import useDataStoragePartiner from "@/hooks/useDataStoragePartiner";
import useEditPartiner from "@/hooks/useEditPartiner";
import { useState } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  customClass?: string;
  customColor?: string;
  isLoading?: boolean;
  disableHover?: boolean;
  data: any;
}

const ButtonEditPartiner = ({
  label,
  disabled,
  icon: Icon,
  type,
  customClass,
  customColor,
  isLoading,
  disableHover,
  data,
}: ButtonProps) => {
  const dataStoragePartiner = useDataStoragePartiner();
  const editPartiner = useEditPartiner();

  const openEditPartner = () => {
    dataStoragePartiner.setPartiner(data);
    editPartiner.onOpen();
  };

  return (
    <button
      onClick={openEditPartner}
      disabled={disabled}
      className={`relative disabled:bg-gray-500 disabled:border-gray-500 disabled:opacity-70  border-2 z-0 text-md disabled:cursor-not-allowed rounded-lg  transition ${
        disableHover ? "" : "hover:opacity-80"
      }
      ${customClass}
    `}
      type={type}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 opacity-70 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className={`uppercase ${customColor}`}>{label}</div>
      )}
    </button>
  );
};

export default ButtonEditPartiner;
