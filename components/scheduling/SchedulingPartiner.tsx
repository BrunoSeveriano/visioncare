import SchedulingEcp from "@/pages/dashboard/scheduling-ecp";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const SchedulingPartiner = () => {
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
    </div>
  );
};

export default SchedulingPartiner;
