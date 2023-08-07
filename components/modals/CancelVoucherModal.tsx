import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../button/Button";
import useCancelVoucher from "@/hooks/useCancelVoucher";
import { deleteVoucher } from "@/services/voucher";
import { ToastContainer, toast } from "react-toastify";
import useDataStorage from "@/hooks/useDataStorage";

const CancelVoucherModal = () => {
  const cancelVoucher = useCancelVoucher();
  const dataStorage = useDataStorage();

  const [voucher, setVoucher] = useState({
    id: dataStorage.id,
    Name: "",
    DiscountType: "",
    DiscountValue: 0,
    DeadlineInDays: 0,
    Note: "",
    ProgramCode: "073",
  });

  const handleDeleteVoucher = async () => {
    try {
      const response = await deleteVoucher(voucher.id, voucher.ProgramCode);
      if (response.isValidData) {
        toast.success("Voucher excluído com sucesso!");
        setVoucher({
          id: "",
          Name: "",
          DiscountType: "",
          DiscountValue: 0,
          DeadlineInDays: 0,
          Note: "",
          ProgramCode: "073",
        });
        cancelVoucher.onClose();
      } else {
        toast.warning(response.additionalMessage || "Voucher não encontrado");
      }
    } catch (err) {
      toast.error("Erro ao cancelar voucher.");
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <Modal
        isCloseIconVisible={false}
        isButtonDisabled
        isOpen={true}
        onClose={cancelVoucher.onClose}
      >
        <div className="flex flex-col items-center text-careLightBlue text-2xl border-b-2 border-b-careOrange mb-2 pb-8 lg:pb-14 lg:text-5xl lg:ml-4 ">
          <span>Deseja CANCELAR o voucher</span>
          <span>cadastrado?</span>
        </div>
        <div className="flex flex-col items-center  text-careDarkBlue text-base pt-5 lg:text-lg lg:pt-7 lg:ml-4">
          <span>Deseja realmente cancelar o voucher?</span>
        </div>

        <div className="flex flex-col items-center mt-5 md:mt-10 mb-2 ">
          <Button
            onClick={handleDeleteVoucher}
            customClass="w-full md:w-96 bg-carePurple border-carePurple py-3 mb-2"
            label="Confirmar"
          />
          <Button
            onClick={cancelVoucher.onClose}
            customClass="w-full md:w-96  text-careBlue border-careBlue py-3"
            label="Cancelar"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CancelVoucherModal;
