import Modal from "./Modal";
import Button from "../button/Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import useDataStorage from "@/hooks/useDataStorage";
import Image from "next/image";
import Input from "../input/Input";
import React, { useCallback, useEffect, useState } from "react";
import { getPatientData } from "@/services/diagnostic";
import { vi } from "date-fns/locale";

const ModalSeeMoreRecipe = () => {
  const register = useRegisterModal();
  const dataStorage = useDataStorage();
  const [dataPacient, setDataPatient] = useState<any>([]);

  useEffect(() => {
    getPatientData(dataStorage.idSchedule)
      .then((response) => {
        setDataPatient(response);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {}, [dataPacient]);

  return (
    <div>
      <Modal
        isCloseIconVisible={false}
        isButtonDisabled
        isOpen={true}
        onClose={register.onClose}
      >
        <div className="border-b border-careLightBlue pb-10">
          <div>
            <span className="text-careDarkBlue text-xl font-bold">
              Dados do paciente:
            </span>
          </div>
          <div className="flex items-center gap-5 mt-5 bg-careDarkBlue p-4 rounded-lg">
            <Image
              quality={100}
              width={40}
              height={40}
              src="/perfil-user.png"
              alt="perfil-user"
            />
            <span className="text-lg text-white">{dataPacient?.name}</span>
          </div>
        </div>
        <div className="mt-8">
          <span className="text-careDarkBlue text-xl">
            Informações do paciente:
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row mt-4 gap-5">
            <span className="md:ml-56 text-sm ml-20 text-careLightBlue font-bold">
              ESFERICO
            </span>
            <span className="md:ml-32 text-sm text-careLightBlue font-bold ">
              CILINDRICO
            </span>
            <span className="md:ml-32 text-sm ml-3 text-careLightBlue font-bold">
              EIXO
            </span>
          </div>
          <div className="flex  gap-5 mr-2">
            <div className="relative top-16 ml-1 md:ml-10 ">
              <span className="text-careBlue">PARA LONGE</span>
            </div>
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.spheric?.left?.far
              }
            />
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.cilindric?.left?.far
              }
            />
            <Input
              disabled
              value={dataPacient?.eyePrescription?.refraction?.axis?.left?.far}
            />
          </div>
          <div className="flex ml-[4.8rem] md:ml-[9.8rem] gap-5 mr-2">
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.spheric?.right?.far
              }
            />
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.cilindric?.right?.far
              }
            />
            <Input
              disabled
              value={dataPacient?.eyePrescription?.refraction?.axis?.right?.far}
            />
          </div>
          <div className="flex  gap-5 mr-2">
            <div className="relative top-16 ml-1 md:ml-10">
              <span className="text-careBlue">PARA PERTO</span>
            </div>
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.spheric?.left?.near
              }
            />
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.cilindric?.left?.near
              }
            />
            <Input
              disabled
              value={dataPacient?.eyePrescription?.refraction?.axis?.left?.near}
            />
          </div>
          <div className="flex ml-[4.8rem] md:ml-[9.7rem] gap-5 mr-2">
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.spheric?.right?.near
              }
            />
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.cilindric?.right?.near
              }
            />
            <Input
              disabled
              value={
                dataPacient?.eyePrescription?.refraction?.axis?.right?.near
              }
            />
          </div>
        </div>
        <div className="flex flex-col items-end mt-5 md:mt-10 mb-2 ">
          <Button
            onClick={register.onClose}
            customClass="w-full md:w-96  text-white bg-careDarkBlue border-careBlue py-3"
            label="OK"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalSeeMoreRecipe;
