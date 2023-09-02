import useDataStorage from "@/hooks/useDataStorage";
import {
  cancelVisitAttendance,
  confirmVisitAttendance,
  patientNotAttended,
} from "@/services/diagnostic";
import { IconType } from "react-icons";

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

const ButtonAttendanceCancel = ({
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

  const handleCancelClick = () => {
    const idVisit = {
      originEntityId: params,
    };
    cancelVisitAttendance(idVisit).then((response) => {
      dataScheduling.setRefresh(!dataScheduling.refresh);
    });
  };

  return (
    <button
      onClick={() => {
        onClick && onClick();
        dataScheduling.setIdSchedule(params);
        handleCancelClick();
      }}
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

export default ButtonAttendanceCancel;
