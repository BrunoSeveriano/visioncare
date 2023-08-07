import { getResumeVoucher } from "@/services/voucher";
import React, { useCallback, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlinePoweroff } from "react-icons/ai";
import { FaHandHolding, FaHandHoldingUsd } from "react-icons/fa";
import { GiCardPlay } from "react-icons/gi";

const CardsDashboardAdmin = () => {
  const [resumeVocuher, setResumeVoucher] = React.useState<any>([]);

  const getResume = useCallback(() => {
    getResumeVoucher().then((response) => {
      console.log(response);
      setResumeVoucher(response);
    });
  }, []);

  useEffect(() => {
    getResume();
  }, [getResume]);

  return (
    <div className="flex flex-col md:flex md:flex-row gap-7 fade-in">
      <div className="w-full h-32 border border-careGreen rounded-2xl ">
        <div className="flex justify-between px-6 mt-4">
          <span className="text-xl text-careBlue">Resgatado</span>
          <div className="bg-careGreen p-3 rounded-full text-white">
            <AiOutlineCheckCircle size={"25px"} />
          </div>
        </div>
        <div className="flex justify-between px-6">
          <span className="text-5xl text-careGreen pr-10">
            {resumeVocuher.ransomed}
          </span>
          <span className="text-xs text-careLightBlue underline mt-6 cursor-pointer">
            Ver detalhes
          </span>
        </div>
      </div>
      <div className="w-full h-32  border border-careOrange rounded-2xl">
        <div className="flex justify-between px-6 mt-4">
          <span className="text-xl text-careBlue">Utilizados</span>
          <div className="bg-careOrange p-3 rounded-full text-white">
            <GiCardPlay size={"25px"} />
          </div>
        </div>
        <div className="flex justify-between px-6">
          <span className="text-5xl text-careOrange pr-10">
            {resumeVocuher.used}
          </span>
          <span className="text-xs text-careLightBlue underline mt-6 cursor-pointer">
            Ver detalhes
          </span>
        </div>
      </div>
      <div className="w-full h-32 border border-careYellow rounded-2xl">
        <div className="flex justify-between px-6 mt-4">
          <span className="text-xl text-careBlue">A Resgatar</span>
          <div className="bg-careYellow p-3 rounded-full text-white">
            <FaHandHoldingUsd size={"25px"} />
          </div>
        </div>
        <div className="flex justify-between px-6">
          <span className="text-5xl text-careYellow pr-10">
            {resumeVocuher.toRescue}
          </span>
          <span className="text-xs text-careLightBlue underline mt-6 cursor-pointer">
            Ver detalhes
          </span>
        </div>
      </div>
      <div className="w-full h-32 border border-carePurple rounded-2xl">
        <div className="flex justify-between px-6 mt-4">
          <span className="text-xl text-careBlue">Expirado</span>
          <div className="bg-carePurple p-3 rounded-full text-white">
            <AiOutlinePoweroff size={"25px"} />
          </div>
        </div>
        <div className="flex justify-between px-6">
          <span className="text-5xl text-carePurple pr-10">
            {resumeVocuher.expired}
          </span>
          <span className="text-xs text-careLightBlue underline mt-6 cursor-pointer">
            Ver detalhes
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsDashboardAdmin;
