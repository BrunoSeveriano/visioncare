import React from "react";
import ContentCard from "../card/ContentCard";
import useLogin from "@/hooks/useLogin";
import { showChats } from "../specialist/HuggyChat";

const Talkspecialist = () => {
  const login = useLogin();

  const handleButtonClick = () => {
    showChats();
  };

  return (
    <div className="fade-in">
      <div className="mb-3">
        <ContentCard
          svgIcon="/svg/questions.svg"
          title="Fale com um Especialista​"
          subtitle="Tire suas dúvidas com um Especialista ACUVUE®"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
          hideButton
        />
      </div>

      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCard
          onButtonClick={handleButtonClick}
          svgIcon='/chat.png'
          title="Quero tirar duvidas pelo chat​"
          buttonText="Clique aqui"
          textColor="text-white"
          bgColor="bg-careDarkBlue "
          hasIcon
        />
        <ContentCard
          svgIcon="/calluser.png"
          title="Quero falar por telefone​"
          subtitle="Nosso horário de atendimento é de segunda a sexta-feira, das 8h âs 20h"
          textphone="(00) 1234-5678"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue "
          hasIcon
          hideButton
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCard
          svgIcon="/email.png"
          title="Email​"
          subtitle="Escreva para"
          textemail="programamyacuvue@suporteaopaciente.com.br"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue "
          hasIcon
          hideButton
        />
      </div>
    </div>
  );
};

export default Talkspecialist;
