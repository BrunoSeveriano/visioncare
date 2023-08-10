import React from "react";
import ContentCard from "../card/ContentCard";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { CiLocationOn, CiViewList } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";

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
      {/* <div className="flex w-full">
        <div className="w-1/3 bg-red-200 flex flex-col items-center">
          <span>Agendamento</span>
          <div className="rounded-full px-5 py-5 my-2 border-2 border-blue-500">
            <BsFillChatRightTextFill size={25} />
          </div>
          <div className="rounded-full px-5 py-5 my-2 border-2 border-blue-500">
            <CiLocationOn size={25} />
          </div>
          <div className="rounded-full px-5 py-5 my-2 border-2 border-blue-500">
            <SlCalender size={25} />
          </div>
          <div className="rounded-full px-5 py-5 my-2 border-2 border-blue-500">
            <CiViewList size={25} />
          </div>
        </div>
        <div className="">teste</div>
      </div> */}
    </div>
  );
};

export default SchedulingPatient;
