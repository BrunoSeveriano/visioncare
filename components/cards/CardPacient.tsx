import React from "react";
import ContentCard from "../card/ContentCard";
import { useRouter } from "next/router";

const CardPacient = () => {
  const route = useRouter();
  return (
    <div>
      <div className="grid-cols-1 mb-3">
        <ContentCard
          svgIcon="/svg/v-card.svg"
          title="Guia do usuário"
          subtitle="Conheça mais sobre o uso de lentes de contato."
          buttonText="Ver mais"
          isCustomBg
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/patient-voucher")}
          svgIcon="/svg/v-card.svg"
          title="Meus Vouchers​"
          subtitle="Fale com um Especialista"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue "
          hasIcon
        />
        <ContentCard
          svgIcon="/svg/calendar.svg"
          title="Agende sua adaptação"
          subtitle="Encontre a clínica adaptadora mais próxima de você e agende sua adaptação."
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-5 md:mb-5">
        <ContentCard
          svgIcon="/svg/questions.svg"
          title="Fale com um Especialista​"
          subtitle="Tire suas dúvidas com um contatólogo."
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() =>
            route.push(
              "https://www.acuvue.com.br/guia-de-compra/onde-comprar-lentes-de-contato"
            )
          }
          svgIcon="/svg/map.svg"
          title="Onde encontrar?"
          subtitle="Encontre um ponto de venda mais próximo e aproveite seu desconto.​"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
      </div>
    </div>
  );
};

export default CardPacient;
