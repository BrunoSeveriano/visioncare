import React from "react";
import ContentCard from "../card/ContentCard";
import { useRouter } from "next/router";
import ContentCardPacient from "../card/ContentCardPacient";

const CardPacient = () => {
  const route = useRouter();
  return (
    <div>
      <div className="grid-cols-1 mb-3 bg- ">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/user-guide")}
          svgIcon="/svg/v-card.svg"
          title="Guia do usuário"
          subtitle="Veja dicas sobre o uso, cuidados, descarte e troca das lentes de contato."
          buttonText="Saiba mais"
          textColor="text-white"
          bgColor="bg-[url('/user.png')] bg-cover bg-no-repeat bg-careDarkBlue bg-right"
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCardPacient
          cardLink="/dashboard/patient-voucher"
          svgIcon="/svg/v-card.svg"
          title="Meus Vouchers​"
          subtitle="Resgate seu voucher e obtenha descontos!"
          buttonText="Clique aqui"
          textColor="text-white"
          bgColor="bg-careLightBlue "
          hasIcon
        />
        <ContentCardPacient
          cardLink="/dashboard/scheduling"
          svgIcon="/svg/calendar.svg"
          title="Agende sua adaptação"
          subtitle="Encontre a clínica oftalmológica mais próxima de você e agende sua adaptação."
          buttonText="Agendar"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-5 md:mb-5">
        <ContentCardPacient
          cardLink="/dashboard/talk-to-specialist"
          svgIcon="/svg/questions.svg"
          title="Fale com um Especialista​"
          subtitle="Tire suas dúvidas com um Especialista ACUVUE®"
          buttonText="Falar com especialista"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
        <ContentCardPacient
          cardLink="https://www.acuvue.com.br/guia-de-compra/onde-comprar-lentes-de-contato"
          svgIcon="/svg/map.svg"
          title="Onde encontrar?"
          subtitle="Encontre os pontos de venda e clínicas oftalmológicas parceiros mais próximos.​"
          buttonText="Encontre aqui"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
      </div>
    </div>
  );
};

export default CardPacient;
