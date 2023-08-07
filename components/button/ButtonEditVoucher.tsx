import { Rows } from "@/helpers/TableMockup";
import useDataStorage from "@/hooks/useDataStorage";
import useEditVoucher from "@/hooks/useEditVoucher";
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
  voucher: any;
}

const ButtonEditVoucher = ({
  label,
  disabled,
  icon: Icon,
  type,
  customClass,
  customColor,
  isLoading,
  disableHover,
  voucher,
}: ButtonProps) => {
  console.log(voucher);
  const dataStorage = useDataStorage();
  const editVoucher = useEditVoucher();
  const handleEditVoucher = () => {
    dataStorage.setVoucherData({
      id: voucher.id,
      Name: voucher.name,
      DiscountType: voucher.discountType,
      DiscountValue: voucher.discountValue,
      DeadlineInDays: voucher.deadlineInDays,
      Note: voucher.note,
    });
    editVoucher.onOpen();
  };

  return (
    <button
      onClick={handleEditVoucher}
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

export default ButtonEditVoucher;
