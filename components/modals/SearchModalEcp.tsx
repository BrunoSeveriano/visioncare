/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import CustomTable from "../table/CustomTable";
import { getListRescueVoucherPatients } from "@/services/voucher";
import useTalkModal from "@/hooks/useTalkModal";
import { TableMockupValidateVoucher } from "@/helpers/TableMockupValidateVoucher";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import { addPurchase } from "@/services/purchase";
import { toast } from "react-toastify";
import useDataStorage from "@/hooks/useDataStorage";
import useOpen from "@/hooks/useOpen";
import Selected from "../selectedProducted/Selected";
import Loading from "../loading/Loading";

interface ClientData {
  name: string;
  cpf: string;
  email: string;
  vouchers: Voucher[];
}

interface Voucher {
  discountType: string;
  deadlineInDays: number;
  discountValue: number;
  status: string;
}

interface SearchModalProps {
  clientData: ClientData | null;
  selectedStatus: string;
}

const SearchModalEcp = ({ clientData, selectedStatus }: SearchModalProps) => {
  const [clientVouchers, setClientVouchers] = useState<Voucher[]>([]);
  const [inputBlocks, setInputBlocks] = useState([1]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const showHistoryPacient = useTalkModal();
  const useData = useDataStorage();
  const openProduct = useOpen();

  useEffect(() => {
    setIsLoading(true);
    if (clientData && clientData.cpf) {
      getListRescueVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          setClientVouchers(data.vouchers);
        })
        .catch((error) => {
          error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [clientData, useData.refresh]);

  const handleSendProduct = () => {
    setIsLoading(true);

    const adddescountVoucher = {
      voucherId: useData.idVoucher,
      programCode: "073",
      items: useData.AxiesId,
      isUseVoucher: isChecked,
    };

    addPurchase(adddescountVoucher as any)
      .then((response) => {
        toast.success("Voucher e Produto resgatado enviado com sucesso!");
        useData.setRefresh(!useData.refresh);
        openProduct.onClose();
        useData.setAxiesId([]);
      })
      .catch((error) => {
        toast.error("Erro ao enviar voucher e produto resgatado!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClearButtonClick = () => {
    openProduct.onClose();
    showHistoryPacient.onClose();
  };

  return (
    <div>
      {clientData ? (
        <div>
          <div className="flex flex-row md:flex md:flex-col fade-in">
            <div className="md:rounded-t-xl w-40 pl-5 grid grid-cols-1 md:w-full bg-careLightGreen md:flex md:justify-around items-center pt-4 pb-4 text-xl text-white  ">
              <span>Cliente</span>
              <span>CPF</span>
              <span className="mr-5">Ações</span>
            </div>
            <div className=" md:rounded-b-xl p-2 grid grid-cols-1 w-full bg-careOffWhite md:flex md:justify-around items-center pt-3 pb-3 text-md text-careDarkBlue ">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <span className="border-b-2 pt-1 md:ml-5 pb-2 md:border-none">
                    {clientData.name}
                  </span>
                  <span className="border-b-2 pt-1 pb-2 md:border-none">
                    {clientData.cpf}
                  </span>
                  <div className="flex justify-end pt-2 md:pt-0 ">
                    <Button
                      onClick={showHistoryPacient.onOpen}
                      disableHover
                      label="Ver mais"
                      customClass="bg-careDarkBlue border-careDarkBlue p-9 py-1 mr-1"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {showHistoryPacient.isOpen ? (
            <div className="mt-7 md:flex md:flex-row gap-5 fade-in">
              <div className="md:w-full w-[22rem]">
                <CustomTable
                  isLoading={isLoading}
                  rowId="id"
                  rows={clientVouchers}
                  columns={TableMockupValidateVoucher.columns}
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {openProduct.isOpen ? (
        <>
          {inputBlocks.map((item, index) => (
            <div key={index} className="md:flex md:flex-row flex flex-col">
              <Selected
                clientData={clientData}
                totalQuantity={inputBlocks.length}
              />
              {inputBlocks.length < 2 ? (
                <div className="bg-careMenuGrey rounded-full p-4 h-5 w-5 relative md:top-11 md:left-3 cursor-pointer mt-3 md:mt-20">
                  <span
                    onClick={() =>
                      setInputBlocks([...inputBlocks, inputBlocks.length + 1])
                    }
                    className="relative right-2 bottom-2"
                  >
                    <AiOutlinePlus className="text-white" />
                  </span>
                </div>
              ) : null}
            </div>
          ))}

          <div className="bg-careGrey col-span-3 rounded-md p-2 md:flex md:flex-row md:justify-between lg:flex lg:flex-row lg:justify-between flex flex-col mt-4">
            <div className="flex items-center">
              <div className="border-careDarkPurple border-r-[2px] text-careDarkPurple">
                <AiOutlineInfoCircle className="mr-3" size="2rem" />
              </div>
              <span className="pl-5 text-careDarkBlue">
                Caso necessário, você poderá gerar um pedido de compra.
              </span>
            </div>
            <div className="flex items-center lg:mt-0 md:mt-0 mt-2">
              <Switch
                {...label}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className="text-careDarkBlue font-bold">
                Gerar pedido de compra
              </span>
            </div>
          </div>
          <div className="mt-5 md:flex md:flex-row flex flex-col items-center justify-end">
            <Button
              onClick={handleClearButtonClick}
              label="Cancelar"
              customClass="bg-careDarkBlue border-careDarkBlue h-12 md:w-40 w-full text-sm mr-2 mt-2"
            />
            <Button
              onClick={handleSendProduct}
              label="Salvar"
              customClass="bg-careLightBlue border-careLightBlue h-12 md:w-40 w-full text-sm mr-2 mt-2"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SearchModalEcp;
