import React, { useCallback } from "react";
import Input from "@/components/input/Input";
import { BsSearch } from "react-icons/bs";
import {
  getListRescueVoucherPatients,
  getListVoucherPatients,
} from "@/services/voucher";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import SearchModalEcp from "../modals/SearchModalEcp";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "../button/Button";
import useTalkModal from "@/hooks/useTalkModal";
import useOpen from "@/hooks/useOpen";

const VoucherPartinerEcp = () => {
  const [searchCpf, setSearchCpf] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showCustomTable, setShowCustomTable] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchModalData, setSearchModalData] = useState(null);
  const showHistoryPacient = useTalkModal();
  const openProduct = useOpen();

  const handleSearchClient = async () => {
    try {
      if (searchCpf.trim() === "" || searchCpf.length < 11) {
        setShowCustomTable(true);
        setShowSearchModal(false);
        return;
      }
      const clientData = await getListRescueVoucherPatients({ cpf: searchCpf });
      setSearchModalData(clientData);
      setShowSearchModal(true);
      setShowCustomTable(false);
      setSelectedStatus("");
    } catch (error) {
      setSearchModalData(null);
    }
  };

  const handleCpfChange = (e: any) => {
    setSearchCpf(e.target.value);
  };

  const handleClearButtonClick = () => {
    setSearchCpf("");
    setShowCustomTable(true);
    setShowSearchModal(false);
    openProduct.onClose();
    showHistoryPacient.onClose();
  };

  const maskedCpf = () => {
    return (
      <InputMask
        mask="999.999.999-99"
        value={searchCpf}
        onChange={handleCpfChange}
      >
        <Input
          placeholder="Digite o CPF do cliente"
          startIcon
          iconClass="scale-x-[-1]"
          iconStart={BsSearch}
          onEnter={handleSearchClient}
        />
      </InputMask>
    );
  };
  return (
    <div>
      <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
        <div className="border-careLightBlue border-r-[2px] text-careDarkBlue">
          <AiOutlineInfoCircle className="mr-3" size="2rem" />
        </div>
        <span className="pl-5 text-careDarkBlue">
          Para validar o voucher, digite o CPF do paciente.​ É necessário que
          seu paciente ative o voucher para ficar visível aqui.
        </span>
      </div>
      <div className="md:grid md:grid-cols-1 gap-8 my-2 fill-careDarkBlue mt-10">
        <div>
          <span className="text-2xl text-careLightBlue">
            Localizar Voucher por Cliente
          </span>
          <div className="mb-8 md:mb-0 sm:grid-cols-1 md:grid md:grid-cols-4 items-center">
            <div className="col-span-2">{maskedCpf()}</div>
            <div className="flex md:ml-5 md:mt-1 mt-3">
              <Button
                onClick={handleClearButtonClick}
                label="Limpar"
                customClass="bg-careDarkBlue border-careDarkBlue h-12 md:w-40 w-full text-sm mr-2 "
              />
            </div>
          </div>
        </div>
        <div className="mb-8 md:mb-0">
          {showSearchModal && (
            <SearchModalEcp
              clientData={searchModalData}
              selectedStatus={selectedStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherPartinerEcp;
