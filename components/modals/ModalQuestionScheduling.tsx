import React from "react";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import Input from "../input/Input";
import { BiSearch } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdAlarm } from "react-icons/md";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import useDataStorage from "@/hooks/useDataStorage";
import { responseSurvey } from "@/services/questions";

dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

interface ModalQuestionSchedulingProps {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const ModalQuestionScheduling: React.FC<ModalQuestionSchedulingProps> = ({
  currentQuestion,
  setCurrentQuestion,
}) => {
  const dataStorage = useDataStorage();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeSelected, setTimeSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const questions = [
    "Quando foi a última vez que você consultou um oftalmologista?",
    "Você tem uma prescrição de óculos válida feita nos últimos 12 meses?",
  ];

  const options = [
    [
      "menos de 3 meses",
      "de 3 a 6 meses",
      "de 6 a 12 meses",
      "mais de 12 meses",
    ],
    ["Sim", "Não"],
  ];

  const handleNextClick = async () => {
    // if (selectedOption !== null) {
    //   const selectedOptionText = options[currentQuestion][selectedOption];
    //   const surveyData = {
    //     surveyId: "02bc4ffe-7f5a-492e-b894-c6b817afef02",
    //     questionResponse: selectedOptionText,
    //     questionId: ,
    //   };

    //   await responseSurvey(surveyData).then(() => {
    //     console.log("resposta enviada");
    //   });
    // }

    const maxQuestion = 5;
    if (currentQuestion < maxQuestion - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const shouldShowSecondMessage =
    selectedOption === 3 || (currentQuestion === 1 && selectedOption === 1);

  const disableWeekend = (date: dayjs.Dayjs) => {
    const dayOfWeek = dayjs(date).day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const disablePastDate = (date: dayjs.Dayjs) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  const shouldDisableDate = (date: dayjs.Dayjs) => {
    return disableWeekend(date) || disablePastDate(date);
  };

  const handleTimeSelected = (time: any) => {
    setTimeSelected(time);
  };

  return (
    <div className="w-full rounded-2xl bg-careGrey md:ml-10">
      {currentQuestion === 0 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-lg">
            Encontre a clínica oftalmológica mais próxima e agende já sua
            adaptação!
          </span>
        </div>
      )}

      {currentQuestion === 1 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-lg">
            Encontre a clínica oftalmológica mais próxima e agende já sua
            adaptação!
          </span>
        </div>
      )}

      {currentQuestion === 2 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-lg">
            Digite seu CEP para encontrar o centro clinico mais proximo ao seu
            endereco e selecione o local escolhido:
          </span>
        </div>
      )}

      {currentQuestion === 3 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-lg">
            Para quando deseja agendar sua adaptacao de lentes de contato?
            Escolha tambem o melhor horario:
          </span>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-lg">Estamos quase lá!</span>
        </div>
      )}

      {currentQuestion === 0 && (
        <div className="mt-8 ml-9 md:ml-14">
          <span className="text-xl text-careLightBlue">
            1. Quando foi a última vez que você consultou um oftalmologista?
          </span>
        </div>
      )}

      {currentQuestion === 1 && (
        <div className="mt-8 ml-9 md:ml-14">
          <span className="text-xl text-careLightBlue">
            2. Você tem uma prescrição de óculos válida feita nos últimos 12
            meses?
          </span>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="mt-6 ml-9 md:ml-14">
          <span className="text-xl text-careLightBlue font-bold">
            Informe o seu tipo de refracao:
          </span>
        </div>
      )}

      {currentQuestion === 0 && (
        <>
          <div className="md:flex md:flex-row flex flex-col ml-5 md:ml-12 mt-4 text-careBlue">
            {options[currentQuestion].map((option, index) => (
              <div key={index}>
                <Checkbox
                  sx={{
                    color: "#007cc4",
                    "&.Mui-checked": {
                      color: "#03014C",
                    },
                  }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={selectedOption === index}
                  onClick={() => handleOptionClick(index)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {currentQuestion === 1 && (
        <>
          <div className="md:flex md:flex-row flex flex-col ml-5 md:ml-12 mt-4 text-careBlue">
            {options[currentQuestion].map((option, index) => (
              <div key={index}>
                <Checkbox
                  sx={{
                    color: "#007cc4",
                    "&.Mui-checked": {
                      color: "#03014C",
                    },
                  }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={selectedOption === index}
                  onClick={() => handleOptionClick(index)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {currentQuestion === 2 && (
        <div className="mt-5 md:ml-14 ml-5 fill-careBlue">
          <div>
            <Input className="md:w-96 w-72" startIcon iconStart={BiSearch} />
          </div>
        </div>
      )}

      {currentQuestion === 3 && (
        <div className="mt-3 ml-2 md:ml-16 flex flex-col md:flex md:flex-row">
          <div className="w-80 bg-white md:rounded-l-lg  md:rounded-t-none rounded-t-lg">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                shouldDisableDate={shouldDisableDate}
                onChange={setSelectedDate}
              />
            </LocalizationProvider>
          </div>
          <div className="bg-white border-t-2 md:border-l-2 md:w-[21rem] w-80 border-careGrey flex flex-col md:rounded-e-lg md:rounded-b-none rounded-b-lg">
            <span className="text-lg text-careLightBlue p-4 border-b-2 border-careGrey">
              Selecione um horario
            </span>
            <div className="flex flex-row items-center mt-2">
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "09 horas da manhã"}
                onClick={() => handleTimeSelected("09 horas da manhã")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "09 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                09:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "10 horas da manhã"}
                onClick={() => handleTimeSelected("10 horas da manhã")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "10 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                10:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "11 horas da manhã"}
                onClick={() => handleTimeSelected("11 horas da manhã")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "11 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                11:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "12 horas da tarde"}
                onClick={() => handleTimeSelected("12 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "12 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                12:00
              </span>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "13 horas da tarde"}
                onClick={() => handleTimeSelected("13 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "13 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                13:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "14 horas da tarde"}
                onClick={() => handleTimeSelected("14 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "14 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                14:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "15 horas da tarde"}
                onClick={() => handleTimeSelected("15 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "15 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                15:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "16 horas da tarde"}
                onClick={() => handleTimeSelected("16 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "16 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                16:00
              </span>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "17 horas da tarde"}
                onClick={() => handleTimeSelected("17 horas da tarde")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "17horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                17:00
              </span>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "18 horas da noite"}
                onClick={() => handleTimeSelected("18 horas da noite")}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "18 horas da manhã"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                18:00
              </span>
            </div>
          </div>
          <div className="mt-4 ml-5 flex flex-col ">
            <span className="text-lg text-careLightBlue">Seu agendamento</span>
            <div className="flex items-center gap-2">
              <span className="text-careBlue my-2">
                <BsCalendar2Week size={24} />
              </span>
              {selectedDate && (
                <span className="text-careBlue text-base">
                  {selectedDate.format("DD [de] MMMM [de] YYYY")}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-careBlue my-2">
                <MdAlarm size={24} />
              </span>
              {timeSelected && (
                <span className="text-careBlue text-base">{timeSelected}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="flex flex-col">
          <div className="flex flex-row mt-4 gap-5">
            <span className="md:ml-56 text-sm ml-20 text-careBlue font-bold">
              ESFERICO
            </span>
            <span className="md:ml-32 text-sm text-careBlue font-bold ">
              CILINDRICO
            </span>
            <span className="md:ml-32 text-sm ml-3 text-careBlue font-bold">
              EIXO
            </span>
          </div>
          <div className="flex  gap-5 mr-2">
            <div className="relative top-16 ml-1 md:ml-10 ">
              <span className="text-careBlue">PARA LONGE</span>
            </div>
            <Input type="number" />
            <Input type="number" />
            <Input type="number" />
          </div>
          <div className="flex ml-[4.8rem] md:ml-[9.8rem] gap-5 mr-2">
            <Input type="number" />
            <Input type="number" />
            <Input type="number" />
          </div>
          <div className="flex  gap-5 mr-2">
            <div className="relative top-16 ml-1 md:ml-10">
              <span className="text-careBlue">PARA PERTO</span>
            </div>
            <Input type="number" />
            <Input type="number" />
            <Input type="number" />
          </div>
          <div className="flex ml-[4.8rem] md:ml-[9.7rem] gap-5 mr-2">
            <Input type="number" />
            <Input type="number" />
            <Input type="number" />
          </div>
        </div>
      )}

      <div className="md:flex md:flex-row md:justify-end md:mr-3 mr-14">
        {shouldShowSecondMessage ? (
          <>
            <div className="ml-5 mt-5 md:ml-14 md:mt-14">
              {selectedOption === 3 ? (
                <span className="text-careBlue">
                  Por favor, consulte um oftamologista antes de prosseguir com o
                  agendamento. Clique em Onde Encontrar para enontrar clínicas
                  próximas de seu endereço.
                </span>
              ) : (
                <span className="text-careBlue">
                  Este programa é somente para pacientes que consultaram um
                  oftalmologista nos últimos 12 meses e possuem receita válida.
                  Por favor, consulte seu oftamologista antes de prosseguir com
                  o agendamento.
                </span>
              )}
            </div>
            <div className="mt-0 md:mt-5">
              <Button
                label={selectedOption === 3 ? "Onde Encontrar" : "Ver mais"}
                customClass="w-full bg-careLightBlue border border-careLightBlue text-white rounded-full md:w-40 h-12 mt-10 ml-5"
              />
            </div>
            <div className="mt-0 md:mt-5">
              <Button
                label="Próximo"
                customClass="w-full bg-careBlue border border-careBlue text-white rounded-full md:w-40 h-12 mt-5 md:mt-10 ml-5 opacity-50 cursor-not-allowed mb-5"
                onClick={handleNextClick}
                disabled
              />
            </div>
          </>
        ) : (
          <div
            className={`mt-0 md:mt-5 ${
              currentQuestion === 4 ? "md:mr-5" : null
            } `}
          >
            <Button
              label={currentQuestion === 4 ? "Enviar" : "Próximo"}
              customClass="relative bottom-6 w-full bg-careLightBlue border border-careLightBlue text-white rounded-full md:w-40 h-12 mt-16 md:ml-14 ml-6 mb-5"
              onClick={handleNextClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalQuestionScheduling;
