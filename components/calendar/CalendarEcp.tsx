import { Checkbox } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import CustomSelect from "../select/Select";
import { BsTrash3 } from "react-icons/bs";
import Button from "../button/Button";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { calenderPartinerAdd } from "@/services/resourceworksetting";
import dayjs from "dayjs";
import useLogin from "@/hooks/useLogin";
import { toast } from "react-toastify";

const CalendarEcp = () => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const auth = useLogin();
  const [timeSelected, setTimeSelected] = useState("");
  const [calendarHour, setCalendarHour] = useState(0);
  const [calendarHourAfternoon, setCalendarHourAfternoon] = useState(0);
  const [calendarHourNocturnal, setCalendarHourNocturnal] = useState(0);
  const [selectedHours, setSelectedHours] = useState<any>([]);
  const [selectedMorning, setSelectedMorning] = useState<any>([]);
  const [selectedAfternoon, setSelectedAfternoon] = useState<any>([]);
  const [selectedNocturnal, setSelectedNocturnal] = useState<any>([]);
  const [selectedData, setSelectedData] = useState({
    calendarType: "Personalizado",
    periodMorning: "",
    periodAfternoon: "",
    periodNocturnal: "",
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    serviceDuration: 1,
    valityStart: "",
    valityEnd: "",
    programCode: "073",
    accountId: auth?.userData?.accountId,
  });

  const handleChanges = (event: any) => {
    const { name, value } = event.target;
    setSelectedData({
      ...selectedData,
      [name]: value,
    });
  };

  const handleTimeSelected = (time: any) => {
    setTimeSelected(time);
  };

  const sendDateAndTime = () => {
    const requestData = {
      calendarType: selectedData.calendarType,
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
    calenderPartinerAdd(requestData)
      .then((res) => {
        setSelectedHours([
          ...selectedHours,
          {
            date: dayjs(selectedData.valityStart).format("DD/MM/YYYY"),
            morning: `${calendarHour}`,
            afternoon: `${calendarHourAfternoon}`,
            nocturnal: `${calendarHourNocturnal}`,
          },
        ]);
        toast.success("Horário cadastrado com sucesso!");
      })
      .catch((err) => console.log(err));
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
                checked={timeSelected === "09 horas da manhã"}
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
                checked={timeSelected === "10 horas da manhã"}
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
                checked={timeSelected === "11 horas da manhã"}
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
                checked={timeSelected === "12 horas da tarde"}
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
                checked={timeSelected === "13 horas da tarde"}
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
                checked={timeSelected === "14 horas da tarde"}
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
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "15 horas da tarde"}
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
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={timeSelected === "16 horas da tarde"}
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
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={timeSelected === "17 horas da tarde"}
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
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={timeSelected === "18 horas da noite"}
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
      {selectedHours.map((hour: any, index: any) => (
        <div
          key={index}
          className="md:flex md:flex-row flex flex-col items-center gap-5 mt-5"
        >
          <div className="flex items-center gap-5 p-5 bg-[#f6f6f6] w-96 rounded-lg">
            <Image
              src="/calendar-data.png"
              width={24}
              height={50}
              alt="calendar"
              className="object-contain"
            />
            <span className="text-careLightBlue">{hour.date}</span>
          </div>
          <div className="mb-2 fill-careDarkBlue w-96">
            <CustomSelect
              iconStart={AiOutlineClockCircle}
              startIcon
              fullWidth
              placeholder="Selecione um horário"
              options={[
                { value: hour.morning, label: `Manhã: ${hour.morning}` },
                { value: hour.afternoon, label: `Tarde: ${hour.afternoon}` },
                { value: hour.nocturnal, label: `Nocturno: ${hour.nocturnal}` },
              ]}
            />
          </div>
          <div className="bg-careMenuGrey rounded-full p-3">
            <BsTrash3 size="1.4em" className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarEcp;
