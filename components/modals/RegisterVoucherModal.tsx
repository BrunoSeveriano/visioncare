import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../button/Button";
import { ToastContainer, toast } from "react-toastify";
import useRegisterModal from "@/hooks/useRegisterModal";
import { addVoucher } from "@/services/voucher";
import useDataStorage from "@/hooks/useDataStorage";

const RegisterVoucherModal = () => {
  const register = useRegisterModal();
  const dataStorage = useDataStorage();

  const handleVoucher = async () => {
    addVoucher({
      Name: dataStorage.Name,
      DiscountType: dataStorage.DiscountType,
      DiscountValue: dataStorage.DiscountValue,
      DeadlineInDays: dataStorage.DeadlineInDays,
      Note: dataStorage.Note,
      ProgramCode: "073",
    })
      .then(() => {
        toast.success("Voucher cadastrado com sucesso!");
        register.onClose();
      })

      .catch(() => {
        toast.error("Erro ao cadastrar voucher!");
      });
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
        onClose={register.onClose}
      >
        <div className="flex flex-col items-center text-careLightBlue text-2xl border-b-2 border-b-careOrange mb-2 pb-8 md:px-28 md:py-2  lg:pb-14 lg:text-5xl lg:ml-4 ">
          <span>Deseja ADICIONAR</span>
          <span>cadastrado?</span>
        </div>
        <div className="flex flex-col items-center  text-careDarkBlue text-base pt-5 lg:text-lg lg:pt-7 lg:ml-4">
          <span>Deseja confirmar essa ação?</span>
        </div>

        <div className="flex flex-col items-center mt-5 md:mt-10 mb-2 ">
          <Button
            onClick={handleVoucher}
            customClass="w-full md:w-96 bg-carePurple border-carePurple py-3 mb-2"
            label="Confirmar"
          />
          <Button
            onClick={register.onClose}
            customClass="w-full md:w-96  text-careBlue border-careBlue py-3"
            label="Cancelar"
          />
        </div>
      </Modal>
    </div>
  );
};

export default RegisterVoucherModal;
