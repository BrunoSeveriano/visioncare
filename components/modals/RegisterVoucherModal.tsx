import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../button/Button";

const RegisterVoucherModal = () => {
  return (
    <div>
      <Modal
        isCloseIconVisible={false}
        isButtonDisabled
        isOpen={true}
        onClose={() => {}}
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
            customClass="w-full md:w-96 bg-carePurple border-carePurple py-3 mb-2"
            label="Confirmar"
          />
          <Button
            customClass="w-full md:w-96  text-careBlue border-careBlue py-3"
            label="Cancelar"
          />
        </div>
      </Modal>
    </div>
  );
};

export default RegisterVoucherModal;
