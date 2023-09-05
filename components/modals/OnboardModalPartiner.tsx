import Modal from "./Modal";
import Button from "../button/Button";
import React, { useState } from "react";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/router";
import useOnboardModalPartiner from "@/hooks/useOnboardModalPartiner";

const OnboardModalPartiner = () => {
  const onboardModalPartiner = useOnboardModalPartiner();
  const auth = useLogin();
  const [questionNumber, setQuestionNumber] = useState(0);
  const router = useRouter();

  if (!auth.isLogged) return null;
  return (
    <div>
      <Modal
        isOpen={onboardModalPartiner.isOpen}
        onClose={onboardModalPartiner.onClose}
        isButtonDisabled
        customClass="w-[65rem]"
        isCloseIconVisible={false}
      >
        <div className="my-5 z-40 flex flex-col pb-2 border-b-[0.1rem] text-careLightBlue text-3xl lg:text-5xl border-[#007cc4] lg:pl-10 lg:pb-10">
          <span>Cadastro no MyAcuvue®</span>
        </div>
        <div className="flex flex-col justify-start text-careBlue font-bold text-lg mb-5 lg:text-xl lg:pl-10 mt-10 ">
          <span>Olá, {auth.userData.name}!</span>
        </div>
        <div className="flex flex-col justify-start text-careBlue text-lg mb-5 lg:text-xl lg:pl-10">
          <span>
            Você solicitou o cadastro como Parceiro no Programa no Progarama de
            Benefícios MyAcuvue®
          </span>
        </div>
        <div className="flex flex-col justify-start text-careLightBlue font-bold text-lg mb-5 lg:text-xl lg:pl-10">
          <span>Seu cadastro foi confirmado com sucesso!</span>
        </div>
        <div className="flex flex-col justify-start text-careBlue font-medium text-lg lg:text-xl lg:pl-10">
          <span>
            Clique no botão abaixo e informe o código XXXX para confirmar oseu
            cadastro e acessar a plataforma.
          </span>
        </div>
        <div className="w-full flex flex-col my-12 gap-2 xl:gap-4 justify-end items-center mb-5 lg:mb-1">
          <Button
            customClass="bg-careBlue border-careBlue py-2 xl:py-5 w-80"
            label="AVANÇAR"
            onClick={() => {
              onboardModalPartiner.onClose();
              router.push("/new-password");
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default OnboardModalPartiner;
