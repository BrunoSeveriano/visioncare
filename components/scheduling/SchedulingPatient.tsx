import React from "react";
import ContentCard from "../card/ContentCard";

const SchedulingPatient = () => {
  return (
    <div className="w-full">
      <div className="grid-cols-1 mb-3">
        <ContentCard
          svgIcon="/svg/calendar.svg"
          title="Agende sua adaptação"
          subtitle="Encontre o centro clínico mais próximo e garanta o melhor cuidado para você.​Agende agora mesmo o seu atendimento para ter uma experiência personalizada e eficiente.​​Disponível somente para São Paulo (capital)."
          buttonText="Agende já"
          textColor="text-careLightGreen"
          bgColor="bg-careLightGreen"
          hasIcon
        />
      </div>
    </div>
  );
};

export default SchedulingPatient;
