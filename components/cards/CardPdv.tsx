import React from "react";
import ContentCard from "../card/ContentCard";
import { useRouter } from "next/router";

const CardPdv = () => {
  const route = useRouter();
  return (
    <div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/patient-voucher")}
          svgIcon="/svg/v-card.svg"
          title="Validar Voucher PDV"
          subtitle="Validar os vouchers dos seus pacientes."
          buttonText="ver mais"
          textColor="text-white"
          buttonColor="bg-careDarkBlue"
          bgColor="bg-careLightBlue"
          buttonBorderColor="border-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() => route.push("/dashboard/scheduling")}
          svgIcon="/svg/calendar.svg"
          title="Agendamentos PDV"
          subtitle="Acompanhe, confirme ou recuse solicitações de agendamento."
          buttonText="Agendar"
          textColor="text-white"
          buttonColor="bg-careDarkBlue"
          bgColor="bg-careLightBlue"
          buttonBorderColor="border-careDarkBlue"
          hasIcon
        />
      </div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-5 md:mb-5">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/talk-to-specialist")}
          svgIcon="/svg/questions.svg"
          title="Reembolso​ PDV"
          subtitle="Saiba como obter reembolsos."
          buttonText="ver mais"
          textColor="text-white"
          buttonColor="bg-careDarkBlue"
          bgColor="bg-careLightBlue"
          buttonBorderColor="border-careDarkBlue"
          hasIcon
        />
      </div>
    </div>
  );
};

export default CardPdv;
