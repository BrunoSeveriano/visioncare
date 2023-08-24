import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTable from "../table/CustomTable";
import { TableScheduleManagement } from "@/helpers/TableScheduleManagement";
import { TableAttendanceConfirmation } from "@/helpers/TableAttendanceConfirmation";
import {
  confirmVisitClinic,
  listConfirmedVisitiClinic,
  listVisitiClinic,
} from "@/services/diagnostic";
import useDataStorage from "@/hooks/useDataStorage";

const SchedulingPartiner = () => {
  const dataScheduling = useDataStorage();
  const [listClinic, setListVisitiClinic] = useState<any[]>([]);
  const [listConfirmed, setListConfirmed] = useState<any[]>([]);

  const getVisitiData = useCallback(() => {
    listVisitiClinic(listClinic).then((response) => {
      dataScheduling.setIdSchedule(response);
      setListVisitiClinic(response);
    });
  }, []);

  useEffect(() => {
    getVisitiData();
  }, [getVisitiData]);

  const getConfirmedVisitiClinic = useCallback(() => {
    listConfirmedVisitiClinic(listConfirmed).then((response) => {
      setListConfirmed(response);
    });
  }, []);

  useEffect(() => {
    getConfirmedVisitiClinic();
  }, [getConfirmedVisitiClinic]);

  return (
    <div>
      <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
        <div className="border-careLightBlue border-r-[2px] text-careDarkBlue">
          <AiOutlineInfoCircle className="mr-3" size="2rem" />
        </div>
        <span className="pl-5 text-careDarkBlue">
          Visualize aqui todos os agendamentos solicitados.​ Após a confirmação,
          você verá na aba “Confirmação de agendamentos”.
        </span>
      </div>
      <div className="mt-10">
        <span className="md:text-3xl text-2xl text-careLightBlue mb-10">
          Gestão de Agendamentos
        </span>
        <div className="md:w-full w-[21.5rem] mt-3">
          <CustomTable
            rowId="scheduleDateStart"
            rows={listClinic}
            columns={TableScheduleManagement.columns}
          />
        </div>
      </div>
      <div className="mt-5">
        <span className="md:text-3xl text-[1.3rem] text-careLightBlue mb-10">
          Confirmação de Comparecimento
        </span>
        <div className="md:w-full w-[21.5rem] mt-3 mb-5">
          <CustomTable
            rowId="scheduleDateStart"
            rows={listConfirmed}
            columns={TableAttendanceConfirmation.columns}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulingPartiner;
