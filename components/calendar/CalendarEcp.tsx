import { Checkbox } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import CustomSelect from "../select/Select";
import { BsTrash3 } from "react-icons/bs";
import Button from "../button/Button";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  calenderPartinerAdd,
  calenderPartinerDelete,
  getListMonthlyCalendaraVailabilities,
} from "@/services/resourceworksetting";
import dayjs from "dayjs";
import useLogin from "@/hooks/useLogin";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import useDataStorage from "@/hooks/useDataStorage";

const CalendarEcp = () => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const currentDataMonth = dayjs().format("M");
  const auth = useLogin();
  const [timeSelected, setTimeSelected] = useState("");
  const [calendarHour, setCalendarHour] = useState(0);
  const [calendarHourAfternoon, setCalendarHourAfternoon] = useState(0);
  const [calendarHourNocturnal, setCalendarHourNocturnal] = useState(0);
  const [selectedHours, setSelectedHours] = useState<any>([]);
  const [selectedMorning, setSelectedMorning] = useState<any>([]);
  const [selectedAfternoon, setSelectedAfternoon] = useState<any>([]);
  const [selectedNocturnal, setSelectedNocturnal] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedData, setSelectedData] = useState({
    periodMorning: "",
    periodAfternoon: "",
    periodNocturnal: "",
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    serviceDuration: 1,
    valityStart: "",
    valityEnd: "",
    programCode: "073",
    accountId: auth?.userData?.accountId,
  });

  const filteredData = data.filter((item: any) => item.id);

  const updateData = () => {
    const dataParams = {
      accountId: auth?.userData?.accountId || "",
      month: currentDataMonth || "",
    };
    getListMonthlyCalendaraVailabilities(dataParams.accountId, dataParams.month)
      .then((res) => {
        setData(res);
      })
      .catch();
  };

  useEffect(() => {
    clearInputs();
    updateData();
  }, [auth?.userData?.accountId, currentDate, currentDataMonth, refresh]);

  const sendDateAndTime = () => {
    const requestData = {
      valityStart: selectedData.valityStart,
      valityEnd: selectedData.valityEnd,
      periodMorning: selectedMorning.slice(",").join(),
      periodAfternoon: selectedAfternoon.slice(",").join(),
      periodNocturnal: selectedNocturnal.slice(",").join(),
      sunday: selectedData.sunday,
      monday: selectedData.monday,
      tuesday: selectedData.tuesday,
      wednesday: selectedData.wednesday,
      thursday: selectedData.thursday,
      friday: selectedData.friday,
      saturday: selectedData.saturday,
      serviceDuration: selectedData.serviceDuration,
      programCode: selectedData.programCode,
      accountId: selectedData.accountId,
    };
    setIsLoading(true);
    calenderPartinerAdd(requestData)
      .then((res) => {
        setSelectedMorning([]);
        setSelectedAfternoon([]);
        setSelectedNocturnal([]);

        setSelectedHours([
          ...selectedHours,
          {
            date: dayjs(selectedData.valityStart).format("DD/MM/YYYY"),
            morning: `${calendarHour}`,
            afternoon: `${calendarHourAfternoon}`,
            nocturnal: `${calendarHourNocturnal}`,
          },
        ]);
        setRefresh(!refresh);
        toast.success("Horário cadastrado com sucesso!");
        clearInputs();
      })
      .catch()
      .finally(() => setIsLoading(false));
  };

  const sendDeleteAndTime = (idToDelete: any) => {
    const requestData = {
      id: idToDelete,
      accountId: auth?.userData?.accountId,
      programCode: "073",
    };
    calenderPartinerDelete(requestData as any)
      .then((res) => {
        setRefresh(!refresh);
        toast.success("Horário deletado com sucesso!");
        clearInputs();
      })
      .catch();
  };

  const handleChanges = (event: any) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item: any) => item !== name)
      );
    }
  };

  const handleTimeSelected = (time: any) => {
    setTimeSelected(time);
  };

  const clearInputs = () => {
    setTimeSelected("");
    setCalendarHour(0);
    setCalendarHourAfternoon(0);
    setCalendarHourNocturnal(0);
    setSelectedCheckboxes([]);
  };

  return (
    <div>
      <div className="w-full mt-8">
        <div>
          <span className="md:text-3xl text-2xl text-careLightBlue">
            Meus dias e horários:
          </span>
        </div>
        <div className="bg-careGrey col-span-3 rounded-md p-2 mt-5 flex items-center">
          <div className="border-careDarkBlue border-r-[2px] text-careDarkBlue">
            <AiOutlineInfoCircle className="mr-3" size="2rem" />
          </div>
          <span className="pl-5 text-careDarkBlue">
            Levaremos em consideração os dias de segunda sexta-feira, no horário
            das 9h às 18h. Se você desejar definir um horário específico para um
            determinado dia, utilize o filtro abaixo:
          </span>
        </div>
        <div className="mt-6">
          <span className="text-lg text-careDarkBlue">
            Selecione uma data desejável para receber agendamentos e defina o
            horário de funcionamento do dia:
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex md:flex-row rounded-xl border border-careGrey">
        <div className="w-[50%]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(date: any) => {
                setSelectedData({
                  ...selectedData,
                  valityStart: dayjs(date).format("YYYY-MM-DD"),
                  valityEnd: dayjs(date).format("YYYY-MM-DD"),
                });
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="md:w-full flex flex-col lg:border-l border-careGrey">
          <span className="text-lg text-careLightBlue p-4 border-b border-t lg:border-t-0 border-careGrey">
            Selecione um horario
          </span>
          <div className="flex flex-row items-center mt-2 md:gap-16">
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={selectedCheckboxes.includes("09 horas da manhã")}
                name="09 horas da manhã"
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("09 horas da manhã");
                  setCalendarHour(9);
                  setSelectedMorning([...selectedMorning, 9]);
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
            </div>
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={selectedCheckboxes.includes("10 horas da manhã")}
                name="10 horas da manhã"
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("10 horas da manhã");
                  setCalendarHour(10);
                  setSelectedMorning([...selectedMorning, 10]);
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
            </div>
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                name="11 horas da manhã"
                checked={selectedCheckboxes.includes("11 horas da manhã")}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("11 horas da manhã");
                  setCalendarHour(11);
                  setSelectedMorning([...selectedMorning, 11]);
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
            </div>

            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                name="12 horas da tarde"
                checked={selectedCheckboxes.includes("12 horas da tarde")}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("12 horas da tarde");
                  setCalendarHourAfternoon(12);
                  setSelectedAfternoon([...selectedAfternoon, 12]);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "12 horas da tarde"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                12:00
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center md:gap-16">
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                name="13 horas da tarde"
                checked={selectedCheckboxes.includes("13 horas da tarde")}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("13 horas da tarde");
                  setCalendarHourAfternoon(13);
                  setSelectedAfternoon([...selectedAfternoon, 13]);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "13 horas da tarde"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                13:00
              </span>
            </div>
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                name="14 horas da tarde"
                checked={selectedCheckboxes.includes("14 horas da tarde")}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("14 horas da tarde");
                  setCalendarHourAfternoon(14);
                  setSelectedAfternoon([...selectedAfternoon, 14]);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "14 horas da tarde"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                14:00
              </span>
            </div>
            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                name="15 horas da tarde"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={selectedCheckboxes.includes("15 horas da tarde")}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("15 horas da tarde");
                  setCalendarHourAfternoon(15);
                  setSelectedAfternoon([...selectedAfternoon, 15]);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "15 horas da tarde"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                15:00
              </span>
            </div>

            <div>
              <Checkbox
                sx={{
                  color: "#007cc4",
                  "&.Mui-checked": {
                    color: "#03014C",
                  },
                }}
                name="16 horas da tarde"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={selectedCheckboxes.includes("16 horas da tarde")}
                onChange={handleChanges}
                onClick={() => {
                  handleTimeSelected("16 horas da tarde");
                  setCalendarHourAfternoon(16);
                  setSelectedAfternoon([...selectedAfternoon, 16]);
                }}
              />
              <span
                className={`text-sm text-careBlue ${
                  timeSelected === "16 horas da tarde"
                    ? "text-selected-color"
                    : ""
                }`}
              >
                16:00
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center md:gap-16">
              <div>
                <Checkbox
                  sx={{
                    color: "#007cc4",
                    "&.Mui-checked": {
                      color: "#03014C",
                    },
                  }}
                  name="17 horas da tarde"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={selectedCheckboxes.includes("17 horas da tarde")}
                  onChange={handleChanges}
                  onClick={() => {
                    handleTimeSelected("17 horas da tarde");
                    setCalendarHourAfternoon(17);
                    setSelectedAfternoon([...selectedAfternoon, 17]);
                  }}
                />
                <span
                  className={`text-sm text-careBlue ${
                    timeSelected === "17 horas da tarde"
                      ? "text-selected-color"
                      : ""
                  }`}
                >
                  17:00
                </span>
              </div>
              <div>
                <Checkbox
                  sx={{
                    color: "#007cc4",
                    "&.Mui-checked": {
                      color: "#03014C",
                    },
                  }}
                  name="18 horas da tarde"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={selectedCheckboxes.includes("18 horas da tarde")}
                  onChange={handleChanges}
                  onClick={() => {
                    handleTimeSelected("18 horas da noite");
                    setCalendarHourNocturnal(18);
                    setSelectedNocturnal([...selectedNocturnal, 18]);
                  }}
                />
                <span
                  className={`text-sm text-careBlue ${
                    timeSelected === "18 horas da noite"
                      ? "text-selected-color"
                      : ""
                  }`}
                >
                  18:00
                </span>
              </div>
            </div>
            <div className="flex justify-end lg:mt-10 lg:mr-3 mt-3 mb-3 mr-2">
              <Button
                onClick={sendDateAndTime}
                customClass="bg-careGreen border-careGreen py-2 lg:w-40 w-20"
                label="Salvar"
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filteredData?.map((hour: any, index: any) => (
            <div
              key={index}
              className="md:flex md:flex-row md:justify-start md:items-center flex flex-col items-start md:gap-5 gap-2 mt-5"
            >
              <div className="flex items-center gap-5 p-5 bg-[#f6f6f6] w-full rounded-lg">
                <Image
                  src="/calendar-data.png"
                  width={24}
                  height={50}
                  alt="calendar"
                  className="object-contain"
                />
                <span className="text-careLightBlue">
                  {hour.day}/{hour.month}/{hour.year}
                </span>
              </div>
              <div className="mb-2 fill-careDarkBlue w-full">
                <CustomSelect
                  iconStart={AiOutlineClockCircle}
                  startIcon
                  fullWidth
                  placeholder="Horário personalizado"
                  options={[
                    {
                      value: hour.periodMorning,
                      label: `Manhã: ${hour.periodMorning}`,
                    },
                    {
                      value: hour.periodAfternoon,
                      label: `Tarde: ${hour.periodAfternoon}`,
                    },
                    {
                      value: hour.periodNocturnal,
                      label: `Nocturno: ${hour.periodNocturnal}`,
                    },
                  ]}
                />
              </div>
              <div
                onClick={() => sendDeleteAndTime(hour.id)}
                className="bg-careMenuGrey rounded-full p-3 cursor-pointer"
              >
                <BsTrash3 size="1.4em" className=" text-white " />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CalendarEcp;
