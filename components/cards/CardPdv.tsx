import React from "react";
import ContentCard from "../card/ContentCard";
import { useRouter } from "next/router";

const CardPdv = () => {
  const route = useRouter();
  return (
    <div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-3">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/scheduling-ecp")}
          svgIcon="/svg/v-card.svg"
          title="​Agendamentos"
          subtitle="Saiba como obter reembolsos."
          buttonText="Validar"
          textColor="text-white"
          buttonColor="bg-careDarkBlue"
          bgColor="bg-careLightBlue"
          buttonBorderColor="border-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() => route.push("/dashboard/reimbursement")}
          svgIcon="/card-terugbetaling.png"
          title="Reembolso"
          subtitle="Acompanhe, confirme ou recuse solicitações de agendamento."
          buttonText="Ver Mais"
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
