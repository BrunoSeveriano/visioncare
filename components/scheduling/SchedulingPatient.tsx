import React from "react";
import { useEffect, useState } from "react";
import ContentCard from "../card/ContentCard";
import { BsCheck, BsFillChatRightTextFill } from "react-icons/bs";
import { CiLocationOn, CiViewList } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import ModalQuestionScheduling from "../modals/ModalQuestionScheduling";
import { AiOutlineCheck } from "react-icons/ai";

const SchedulingPatient = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="w-full fade-in">
      <div className="grid-cols-1 mb-3">
        <ContentCard
          svgIcon="/svg/calendar.svg"
          title="Agende sua adaptação"
          subtitle="Encontre o centro clínico mais próximo e garanta o melhor cuidado para você.​Agende agora mesmo o seu atendimento para ter uma experiência personalizada e eficiente.​​Disponível somente para São Paulo (capital)."
          buttonText="Agende já"
          textColor="text-careBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
          hideButton
        />
      </div>
      <div className="flex flex-col mt-10 md:flex md:flex-row  w-full">
        <div className="w-60 flex flex-row md:flex md:flex-col items-center gap-3">
          <div className="flex flex-col md:flex md:flex-row items-center gap-5">
            <span
              className={`text-${
                currentQuestion === 0 || currentQuestion === 1
                  ? "careBlue"
                  : "careLightBlue"
              } md:block hidden`}
            >
              Agendamento
            </span>
            <div
              className={`rounded-full px-4 py-4 my-2 border-2 border-${
                currentQuestion === 0 || currentQuestion === 1
                  ? "careBlue"
                  : "careLightBlue"
              }`}
            >
              <BsFillChatRightTextFill
                size={25}
                className={`text-${
                  currentQuestion === 0 || currentQuestion === 1
                    ? "careBlue"
                    : "careLightBlue"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex md:flex-row items-center gap-5 ">
            <span
              className={` ${
                currentQuestion > 2
                  ? "text-careLightBlue"
                  : "text-careBlue" && currentQuestion === 2
                  ? "text-careBlue"
                  : "text-careMenuGrey"
              } md:block hidden`}
            >
              Local da visita
            </span>
            <div
              className={`rounded-full px-4 py-4 my-2 border-2 border-${
                currentQuestion > 2
                  ? "careLightBlue"
                  : "careBlue" && currentQuestion === 2
                  ? "careBlue"
                  : "careMenuGrey"
              }`}
            >
              <CiLocationOn
                size={25}
                className={`text-${
                  currentQuestion > 2
                    ? "careLightBlue"
                    : "careBlue" && currentQuestion === 2
                    ? "careBlue"
                    : "careMenuGrey"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex md:flex-row items-center gap-5">
            <span
              className={` ${
                currentQuestion > 3
                  ? "text-careLightBlue"
                  : "text-careBlue" && currentQuestion === 3
                  ? "text-careBlue"
                  : "text-careMenuGrey"
              } md:block hidden`}
            >
              Data/Horário
            </span>
            <div
              className={`rounded-full px-4 py-4 my-2 border-2 border-${
                currentQuestion > 3
                  ? "careLightBlue"
                  : "careBlue" && currentQuestion === 3
                  ? "careBlue"
                  : "careMenuGrey"
              }`}
            >
              <SlCalender
                size={25}
                className={`text-${
                  currentQuestion > 3
                    ? "careLightBlue"
                    : "careBlue" && currentQuestion === 3
                    ? "careBlue"
                    : "careMenuGrey"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex md:flex-row items-center gap-5">
            <span
              className={` ${
                currentQuestion > 4
                  ? "text-careLightBlue"
                  : "text-careBlue" && currentQuestion === 4
                  ? "text-careBlue"
                  : "text-careMenuGrey"
              } md:block hidden`}
            >
              Confirmação
            </span>
            <div
              className={`rounded-full px-4 py-4 my-2 border-2 border-${
                currentQuestion > 4
                  ? "careLightBlue"
                  : "careBlue" && currentQuestion === 4
                  ? "careBlue"
                  : "careMenuGrey"
              }`}
            >
              <CiViewList
                size={25}
                className={`text-${
                  currentQuestion > 4
                    ? "careLightBlue"
                    : "careBlue" && currentQuestion === 4
                    ? "careBlue"
                    : "careMenuGrey"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="bg-careMenuGrey md:ml-5 md:h-96 md:w-1 md:my-0 my-6 h-1 rounded-3xl flex flex-row md:flex md:flex-col items-center md:gap-y-7 gap-x-7 ">
          <div
            className={`${
              currentQuestion === 0 || currentQuestion === 1
                ? "bg-careBlue"
                : "bg-careLightBlue"
            } rounded-full p-1  bg-careBlue md:mt-7 md:ml-0 ml-5`}
          >
            {currentQuestion === 0 || currentQuestion === 1 ? (
              <div className={`bg-white p-1 rounded-full`}></div>
            ) : (
              <AiOutlineCheck size={10} className="text-white" />
            )}
          </div>
          <div
            className={`${
              currentQuestion > 2
                ? "bg-careLightBlue"
                : "bg-careBlue" && currentQuestion === 2
                ? "bg-careBlue"
                : "bg-careMenuGrey"
            } rounded-full p-1  md:mt-11 md:ml-0 ml-7`}
          >
            {currentQuestion === 2 ? (
              <div className={`bg-white p-1 rounded-full`}></div>
            ) : (
              <AiOutlineCheck size={10} className="text-white" />
            )}
          </div>
          <div
            className={`${
              currentQuestion > 3
                ? "bg-careLightBlue"
                : "bg-careBlue" && currentQuestion === 3
                ? "bg-careBlue"
                : "bg-careMenuGrey"
            } rounded-full p-1  md:mt-11 md:ml-0 ml-7`}
          >
            {currentQuestion === 3 ? (
              <div className={`bg-white p-1 rounded-full`}></div>
            ) : (
              <AiOutlineCheck size={10} className="text-white" />
            )}
          </div>
          <div
            className={`${
              currentQuestion > 4
                ? "bg-careLightBlue"
                : "bg-careBlue" && currentQuestion === 4
                ? "bg-careBlue"
                : "bg-careMenuGrey"
            } rounded-full p-1  md:mt-11 md:ml-0 ml-7`}
          >
            {currentQuestion === 4 ? (
              <div className={`bg-white p-1 rounded-full`}></div>
            ) : (
              <AiOutlineCheck size={10} className="text-white" />
            )}
          </div>
        </div>
        <ModalQuestionScheduling
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
    </div>
  );
};

export default SchedulingPatient;
