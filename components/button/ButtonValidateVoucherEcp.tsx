import useDataStorage from "@/hooks/useDataStorage";
import useOpen from "@/hooks/useOpen";
import { IconType } from "react-icons";
import { useState } from "react";
import { is } from "date-fns/locale";

interface ButtonProps {
  label: string;
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

const ButtonValidateVoucherEcp = ({
  params,
  label,
  onClick,
  disabled,
  icon: Icon,
  type,
  customClass,
  customColor,
  isLoading,
  disableHover,
}: ButtonProps) => {
  const useStorage = useDataStorage();
  const openProduct = useOpen();
  const [selectedRow, setSelectedRow] = useState(null);

  const [buttonState, setButtonState] = useState({
    clicked: false,
    label: "Utilizar",
  });

  const handleButtonClick = () => {
    if (!buttonState.clicked) {
      setButtonState({
        clicked: true,
        label: "Selecionado",
      });
    }
    setSelectedRow(params.id);
  };

  return (
    <button
      onClick={() => {
        onClick && onClick();
        useStorage.setIdVoucher(params);
        openProduct.onOpen();
        handleButtonClick();
      }}
      disabled={disabled}
      className={`${
        params?.row?.id === selectedRow ? "bg-carePurple" : "bg-careGreen"
      } border ${
        params?.row?.id === selectedRow
          ? "border-carePurple"
          : "border-careGreen"
      } w-full py-2 text-sm relative disabled:bg-gray-500 disabled:border-gray-500 disabled:opacity-70  border-2 z-0 text-md disabled:cursor-not-allowed rounded-lg  transition ${
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
        <div className={`uppercase ${customColor}`}>{buttonState.label}</div>
      )}
    </button>
  );
};

export default ButtonValidateVoucherEcp;
