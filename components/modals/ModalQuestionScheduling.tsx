import React from "react";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import Input from "../input/Input";
import { BsCalendar2Week, BsQuestionCircle } from "react-icons/bs";
import { MdAlarm, MdOutlineLocationOn } from "react-icons/md";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { responseSurvey } from "@/services/questions";
import { getLocation } from "@/services/location";
import { getCalendar } from "@/services/calendar";
import { schedulevisittoclinic } from "@/services/diagnostic";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getAddressByCep } from "@/services/cep";
import useLogin from "@/hooks/useLogin";

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
  const dataStorage = useLogin();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [surveyData, setSurveyData] = useState<any>([]);
  const [calendarData, setCalendarData] = useState([]);
  const [calendarHour, setCalendarHour] = useState(0);
  const [postData, setPostData] = useState<any>({
    name: dataStorage?.userDataPatient[0]?.namePatient,
    scheduleDateStart: "",
    eyePrescription: {
      refraction: {
        spheric: {
          left: {
            far: 0,
            near: 0,
          },
          right: {
            far: 0,
            near: 0,
          },
        },
        cilindric: {
          left: {
            far: 0,
            near: 0,
          },
          right: {
            far: 0,
            near: 0,
          },
        },
        axis: {
          left: {
            far: 0,
            near: 0,
          },
          right: {
            far: 0,
            near: 0,
          },
        },
      },
    },
    accountId: "",
  });

  const options = [
    [
      "menos de 3 meses",
      "de 3 a 6 meses",
      "de 6 a 12 meses",
      "mais de 12 meses",
    ],
    ["Sim", "Não"],
  ];

  const optionQuestionIds = [
    [
      "ffc89394-2bd4-4746-b36e-68f382f9b95d",
      "ffc89394-2bd4-4746-b36e-68f382f9b95d",
      "ffc89394-2bd4-4746-b36e-68f382f9b95d",
      "ffc89394-2bd4-4746-b36e-68f382f9b95d",
    ],
    [
      "25ba0262-2e06-4ed7-bda6-a009e78d05c0",
      "25ba0262-2e06-4ed7-bda6-a009e78d05c0",
    ],
  ];

  const handleNextClick = async () => {
    if (selectedOption !== null) {
      const selectedOptionText = options[currentQuestion][selectedOption];
      const questionId = optionQuestionIds[currentQuestion][selectedOption];

      setSurveyData((prevSurveyData: any) => [
        ...prevSurveyData,
        {
          surveyId: "6b7c2c11-3951-4b5d-89b4-2797f487b9b7",
          questionResponse: selectedOptionText,
          questionId: questionId,
        },
      ]);

      if (currentQuestion === 1 && selectedOption === 0) {
        await responseSurvey(surveyData).then(() => {});
      }
    }

    if (currentQuestion === 3) {
      setPostData({
        ...postData,
        scheduleDateStart: dayjs(selectedDate).format(
          `YYYY-MM-DDT${calendarHour === 9 ? "09" : calendarHour}:mm:ss.SSS`
        ),
      });
    }

    const maxQuestion = 5;
    if (currentQuestion < maxQuestion - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }

    if (currentQuestion === 4) {
      await schedulevisittoclinic(postData).then(() => {
        toast.success(
          "Agendamento feito com sucesso! Aguarde o recebimento de confirmação do agendamento via e-mail. Até logo!"
        );
        router.push("/dashboard/home");
      });
    }
  };

  const handleChange = (e: any, side: string, option: string) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      eyePrescription: {
        refraction: {
          ...postData.eyePrescription?.refraction,
          [name]: {
            ...postData.eyePrescription?.refraction[name],
            [side]: {
              ...postData.eyePrescription?.refraction[name][side],
              [option]: value,
            },
          },
        },
      },
    });
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const shouldShowSecondMessage =
    selectedOption === 3 || (currentQuestion === 1 && selectedOption === 1);

  const handlePostalCodeChange = async (e: any) => {
    setIsLoading(true);
    const newPostalCode = e.target.value;
    setPostalCode(newPostalCode);

    if (newPostalCode.length >= 8) {
      getAddressByCep(newPostalCode)
        .then((response) => {
          const { state } = response;
          if (state !== "SP") {
            setLocationData([]);
            return toast.error(
              "No momento, estamos atendendo apenas no estado de SP"
            );
          }
          getClinics(newPostalCode);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados de localização:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getClinics = async (newPostalCode: string) => {
    const filters = {
      postalCode: newPostalCode,
    };

    getLocation(filters)
      .then((response) => {
        setLocationData(response);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de localização:", error);
      });
  };

  const handleSpanClick = (locationId: any) => {
    setIsLocationClicked(locationId);
    setPostData({ ...postData, accountId: locationId });
  };

  useEffect(() => {
    async function fetchCalendarData() {
      if (postData.accountId === "") return;
      const filters = {
        accountId: postData.accountId,
        month: dayjs().format("MM"),
      };
      getCalendar(filters)
        .then((response) => {
          setCalendarData(response);
        })
        .catch((error) => {
          toast.error("Erro ao buscar dados de calendário");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchCalendarData();
  }, [postData.accountId]);

  const shouldDisableDate = (date: dayjs.Dayjs) => {
    const today = dayjs();
    const maxSelectableDate = today.add(8, "day");
    return (
      date.day() === 0 ||
      date.day() === 6 ||
      date.isBefore(maxSelectableDate, "day")
    );
  };

  const handleTimeSelected = (time: any) => {
    setTimeSelected(time);
  };

  return (
    <div className="w-full rounded-2xl bg-careGrey md:ml-5">
      {currentQuestion === 0 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-base md:text-lg xl:text-sm 2xl:text-lg">
            Encontre a clínica oftalmológica mais próxima e agende já sua
            adaptação!
          </span>
        </div>
      )}

      {currentQuestion === 1 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-base md:text-lg xl:text-sm 2xl:text-lg">
            Encontre a clínica oftalmológica mais próxima e agende já sua
            adaptação!
          </span>
        </div>
      )}

      {currentQuestion === 2 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-base md:text-lg xl:text-sm 2xl:text-lg">
            Digite seu CEP para encontrar o centro clinico mais proximo ao seu
            endereco e selecione o local escolhido:
          </span>
        </div>
      )}

      {currentQuestion === 3 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-base md:text-lg xl:text-sm 2xl:text-lg">
            Para quando deseja agendar sua adaptacao de lentes de contato?
            Escolha tambem o melhor horario:
          </span>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="border-b-2 border-careLightGreen w-4/5 ml-5 md:ml-10 p-4">
          <span className="text-careBlue text-base md:text-lg xl:text-sm 2xl:text-lg">
            Estamos quase lá!
          </span>
        </div>
      )}

      {currentQuestion === 0 && (
        <div className="mt-8 ml-9 md:ml-14">
          <span className="text-base md:text-base xl:text-sm 2xl:text-lg font-bold text-careLightBlue">
            1. Quando foi a última vez que você consultou um oftalmologista?
          </span>
        </div>
      )}

      {currentQuestion === 1 && (
        <div className="mt-8 ml-9 md:ml-14">
          <span className="text-base md:text-base xl:text-sm 2xl:text-lg font-bold text-careLightBlue">
            2. Você tem uma prescrição de óculos válida feita nos últimos 12
            meses?
          </span>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="flex items-center gap-3 mt-6 ml-9 md:ml-14">
          <span className="text-base md:text-base xl:text-base 2xl:text-lg font-bold text-careLightBlue">
            Informe o seu tipo de refração:
          </span>
          <span className="tooltip text-careDarkBlue cursor-pointer">
            <BsQuestionCircle size={24} />
            <span className="tooltiptext">
              <span className="md:text-sm xl:text-xs 2xl:text-lg">
                <span className="text-careDarkBlue mr-1"> Esférico:</span>É o
                grau das lentes de contato para a correção de miopia e
                hipermetropia. No caso da miopia, o grau é negativo. Se for
                hipermetropia, o grau é positivo.
              </span>
              <span className="md:text-sm xl:text-xs 2xl:text-lg">
                <span className="text-careDarkBlue mr-1 ml-1">Cilindro:</span> É
                o grau das lentes de contato para a correção de astigmatismo.
                Eixo: É o posicionamento das lentes de contato nos olhos para a
                correção do astigmatismo. É definido pelo médico e o valor
                consta na receita.
              </span>
              <span className="md:text-sm xl:text-xs 2xl:text-lg">
                <span className="text-careDarkBlue mr-1 ml-1">Adição:</span>É o
                grau informado pelo médico para as lentes de contato multifocais
                ou bifocais que corrigem presbiopia (vista cansada).
              </span>
            </span>
          </span>
        </div>
      )}

      {currentQuestion === 0 && (
        <>
          <div className="md:flex md:flex-row flex flex-col ml-5 md:ml-12 xl:ml-12 2xl:ml-12  mt-4 text-careBlue">
            {options[currentQuestion].map((option, index) => (
              <div key={index} className="flex items-center whitespace">
                <Checkbox
                  sx={{
                    color: "#007cc4",
                    "&.Mui-checked": {
                      color: "#03014C",
                    },
                  }}
                  icon={
                    <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                  }
                  checked={selectedOption === index}
                  onClick={() => handleOptionClick(index)}
                />
                <span className="text-base md:text-xs xl:text-xs 2xl:text-lg">
                  {option}
                </span>
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
                  icon={
                    <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                  }
                  checked={selectedOption === index}
                  onClick={() => handleOptionClick(index)}
                />
                <span className="text-base md:text-xs xl:text-sm 2xl:text-lg">
                  {option}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {currentQuestion === 2 && (
        <div className="mt-5 md:ml-14 ml-5 flex flex-col fill-careBlue">
          <div>
            <Input
              value={postalCode}
              onChange={handlePostalCodeChange}
              className="md:w-96 w-72 2xl:w-96 xl:w-72 xl:py-[1px]"
              startIcon
              imageSrc="/search-icon.png"
            />
            {isLoading ? (
              <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
              </div>
            ) : (
              <>
                {locationData.map((location: any, index: number) => (
                  <div
                    className={`flex items-center gap-3 fade-in border-b w-72 md:w-96 border-careMenuGrey rounded cursor-pointer mt-1 ${
                      isLocationClicked === location.id
                        ? "bg-careDarkBlue"
                        : "bg-[#f6f6f6]"
                    } p-5`}
                    key={index}
                  >
                    <MdOutlineLocationOn
                      className="text-careLightBlue"
                      size={24}
                    />
                    <span
                      onClick={() => handleSpanClick(location.id)}
                      className={`text-base ${
                        isLocationClicked === location.id
                          ? "text-careLightBlue "
                          : "text-careBlue"
                      }`}
                    >
                      {location.name}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {currentQuestion === 3 && (
        <div className="mt-3 ml-5 md:ml-5 xl:ml-8 2xl:ml-14 flex flex-col md:flex md:flex-row">
          <div className="bg-white md:rounded-l-lg  md:rounded-t-none rounded-t-lg">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                shouldDisableDate={shouldDisableDate}
                onChange={setSelectedDate}
                className="w-80 xl:w-[18.8rem]"
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "09 horas da manhã"}
                onClick={() => {
                  handleTimeSelected("09 horas da manhã");
                  setCalendarHour(9);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "10 horas da manhã"}
                onClick={() => {
                  handleTimeSelected("10 horas da manhã");
                  setCalendarHour(10);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "11 horas da manhã"}
                onClick={() => {
                  handleTimeSelected("11 horas da manhã");
                  setCalendarHour(11);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "12 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("12 horas da tarde");
                  setCalendarHour(12);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "13 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("13 horas da tarde");
                  setCalendarHour(13);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "14 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("14 horas da tarde");
                  setCalendarHour(14);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "15 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("15 horas da tarde");
                  setCalendarHour(15);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "16 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("16 horas da tarde");
                  setCalendarHour(16);
                }}
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "17 horas da tarde"}
                onClick={() => {
                  handleTimeSelected("17 horas da tarde");
                  setCalendarHour(17);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "17 horas da manhã"
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
                icon={
                  <RadioButtonUncheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checkedIcon={
                  <RadioButtonCheckedIcon className="text-lg xl:text-xl 2xl:text-2xl" />
                }
                checked={timeSelected === "18 horas da noite"}
                onClick={() => {
                  handleTimeSelected("18 horas da noite");
                  setCalendarHour(18);
                }}
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
          <div className="mt-4 ml-2 flex flex-col ">
            <span className="text-sm whitespace-nowrap text-careLightBlue">
              Seu agendamento
            </span>
            <div className="flex items-center gap-2">
              <span className="text-careBlue my-2">
                <BsCalendar2Week size={18} />
              </span>
              {selectedDate && (
                <span className="text-careBlue text-xs whitespace-nowrap">
                  {calendarData &&
                    selectedDate.format("DD [de] MMMM [de] YYYY")}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-careBlue my-2">
                <MdAlarm size={18} />
              </span>
              {timeSelected && (
                <span className="text-careBlue text-xs whitespace-nowrap">
                  {timeSelected}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="flex flex-col mt-5">
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-3 justify-start ml-3 mr-2">
              <div className="relative md:top-24 top-16">
                <span className="text-careBlue text-base md:text-base xl:text-lg">
                  PARA LONGE
                </span>
              </div>
              <div className="flex flex-col mt-1 ">
                <span className=" text-sm md:ml-16 ml-3 text-careBlue font-bold">
                  ESFERICO
                </span>
                <Input
                  name="spheric"
                  onChange={(e) => handleChange(e, "left", "far")}
                  type="number"
                />
              </div>
              <div className="flx flex-col">
                <span className=" md:ml-16 text-sm text-careBlue font-bold ">
                  CILINDRICO
                </span>
                <Input
                  name="cilindric"
                  onChange={(e) => handleChange(e, "left", "far")}
                  type="number"
                />
              </div>
              <div className="flx flex-col">
                <span className=" md:ml-20 ml-7 text-sm  text-careBlue font-bold">
                  EIXO
                </span>
                <Input
                  name="axis"
                  onChange={(e) => handleChange(e, "left", "far")}
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-3 md:ml-[7.6rem] ml-[4.9rem] mr-2">
              <Input
                name="spheric"
                onChange={(e) => handleChange(e, "right", "far")}
                type="number"
              />
              <Input
                name="cilindric"
                onChange={(e) => handleChange(e, "right", "far")}
                type="number"
              />
              <Input
                name="axis"
                onChange={(e) => handleChange(e, "right", "far")}
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <div className="flex gap-3 justify-start ml-3 mr-2">
              <div className="relative md:top-[4.5rem] top-16 ">
                <span className="text-careBlue text-base md:text-base xl:text-lg ">
                  PARA PERTO
                </span>
              </div>
              <div className="flex gap-3 justify-center">
                <Input
                  name="spheric"
                  onChange={(e) => handleChange(e, "left", "near")}
                  type="number"
                />
                <Input
                  name="cilindric"
                  onChange={(e) => handleChange(e, "left", "near")}
                  type="number"
                />
                <Input
                  name="axis"
                  onChange={(e) => handleChange(e, "left", "near")}
                  type="number"
                />
              </div>
            </div>

            <div className="flex gap-3 md:ml-[7.4rem] ml-[4.6rem] mr-2 ">
              <Input
                name="spheric"
                onChange={(e) => handleChange(e, "right", "near")}
                type="number"
              />
              <Input
                name="cilindric"
                onChange={(e) => handleChange(e, "right", "near")}
                type="number"
              />
              <Input
                name="axis"
                onChange={(e) => handleChange(e, "right", "near")}
                type="number"
              />
            </div>
          </div>
        </div>
      )}

      <div className="md:flex md:flex-row md:justify-end md:mr-3 mr-14">
        {shouldShowSecondMessage ? (
          <>
            <div className="ml-5 mt-5 md:ml-14 md:mt-14">
              {selectedOption === 3 ? (
                <span className="text-careBlue text-base md:text-base xl:text-xs 2xl:text-base">
                  Por favor, consulte um oftamologista antes de prosseguir com o
                  agendamento. Clique em Onde Encontrar para enontrar clínicas
                  próximas de seu endereço.
                </span>
              ) : (
                <span className="text-careBlue text-base md:text-base xl:text-xs 2xl:text-base">
                  Este programa é somente para pacientes que consultaram um
                  oftalmologista nos últimos 12 meses e possuem receita válida.
                  Por favor, consulte seu oftamologista antes de prosseguir com
                  o agendamento.
                </span>
              )}
            </div>
            <div className="mt-0 md:mt-5">
              <Button
                onClick={() =>
                  window.open(
                    "https://www.acuvue.com.br/guia-de-compra/onde-comprar-lentes-de-contato",
                    "_blank"
                  )
                }
                label={selectedOption === 3 ? "Onde Encontrar" : "Ver mais"}
                customClass="w-full bg-careLightBlue border border-careLightBlue text-white rounded-full md:w-40 h-12 xl:h-9 2xl:h-14 mt-10 ml-5"
              />
            </div>
            <div className="mt-0 md:mt-5">
              <Button
                label="Próximo"
                customClass="w-full bg-careBlue border border-careBlue text-white rounded-full md:w-40 h-12 xl:h-9 2xl:h-14 mt-5 md:mt-10 ml-5 opacity-50 cursor-not-allowed mb-5"
                onClick={handleNextClick}
                disabled
              />
            </div>
          </>
        ) : (
          <div
            className={`mt-0 md:mt-5 ${
              currentQuestion === 4 ? "md:mr-5 mb-5" : null
            } `}
          >
            <Button
              label={currentQuestion === 4 ? "Enviar" : "Próximo"}
              customClass="relative bottom-6 w-full bg-careLightBlue border border-careLightBlue text-white rounded-full md:w-40 h-12 xl:h-9 2xl:h-14 mt-16 md:ml-14 ml-6 mb-5"
              onClick={handleNextClick}
              disabled={
                currentQuestion === 0 && selectedOption === null
                  ? true
                  : currentQuestion === 1 && selectedOption === null
                  ? true
                  : currentQuestion === 2 && postalCode.length < 8
                  ? true
                  : currentQuestion === 3 &&
                    (selectedDate === null || timeSelected === "")
                  ? true
                  : currentQuestion === 4 &&
                    (postData.eyePrescription.refraction.spheric.left.far ===
                      0 ||
                      postData.eyePrescription.refraction.spheric.left.near ===
                        0 ||
                      postData.eyePrescription.refraction.spheric.right.far ===
                        0 ||
                      postData.eyePrescription.refraction.spheric.right.near ===
                        0 ||
                      postData.eyePrescription.refraction.cilindric.left.far ===
                        0 ||
                      postData.eyePrescription.refraction.cilindric.left
                        .near === 0 ||
                      postData.eyePrescription.refraction.cilindric.right
                        .far === 0 ||
                      postData.eyePrescription.refraction.cilindric.right
                        .near === 0 ||
                      postData.eyePrescription.refraction.axis.left.far === 0 ||
                      postData.eyePrescription.refraction.axis.left.near ===
                        0 ||
                      postData.eyePrescription.refraction.axis.right.far ===
                        0 ||
                      postData.eyePrescription.refraction.axis.right.near === 0)
                  ? true
                  : false
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalQuestionScheduling;
