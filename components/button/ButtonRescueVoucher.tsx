import useClientColors from "@/hooks/useClientConfiguration";
import useDataStorage from "@/hooks/useDataStorage";
import { rescueVoucher } from "@/services/voucher";
import { IconType } from "react-icons";
import { toast } from "react-toastify";

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

const ButtonRescueVoucher = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  type,
  customClass,
  customColor,
  isLoading,
  disableHover,
  params,
}: ButtonProps) => {
  const dataScheduling = useDataStorage();

  const handleSendProduct = () => {
    const statusVoucher = {
      programCode: "073",
      voucherId: params,
    };
    rescueVoucher(statusVoucher)
      .then((response) => {
        if (!response.isValidData) {
          toast.error(response.message);
          return;
        }
        toast.success("Voucher resgatado com sucesso!");
        dataScheduling.setRefresh(!dataScheduling.refresh);
        console.log(statusVoucher);
      })
      .catch((error) => {
        toast.error("Erro ao resgatar voucher!");
      });
  };

  return (
    <button
      onClick={() => {
        onClick && onClick();
        dataScheduling.setIdSchedule(params);
        handleSendProduct();
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

export default ButtonRescueVoucher;
