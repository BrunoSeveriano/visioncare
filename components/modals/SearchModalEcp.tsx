/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import CustomTable from "../table/CustomTable";
import {
  getAxle,
  getCodeNumber,
  getCylinder,
  getDegree,
  getListRescueVoucherPatients,
  useVoucher,
} from "@/services/voucher";
import useTalkModal from "@/hooks/useTalkModal";
import { TableMockupValidateVoucher } from "@/helpers/TableMockupValidateVoucher";
import CustomSelect from "../select/Select";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { addPurchase } from "@/services/purchase";
import { ToastContainer, toast } from "react-toastify";
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
  const [inputBlocks, setInputBlocks] = useState([{ id: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
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
    const statusVoucher = {
      programCode: "073",
      voucherId: useData.idVoucher,
      productId: useData.AxiesId,
    };

    useVoucher(statusVoucher)
      .then(() => {
        return addPurchase(useData.AxiesId);
      })
      .then((response) => {
        toast.success("Voucher e Produto resgatado enviado com sucesso!");
        useData.setRefresh(!useData.refresh);
        openProduct.onClose();
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

  const handleAddInputBlock = (currentIndex: any) => {
    if (inputBlocks.length < 4) {
      const newBlock = { id: inputBlocks.length + 1 };
      setInputBlocks((prevBlocks) => [
        ...prevBlocks.slice(0, currentIndex + 1),
        newBlock,
        ...prevBlocks.slice(currentIndex + 1),
      ]);
    }
  };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: green[600],
    },
  }));
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
          {inputBlocks.map((block, index) => (
            <>
              <Selected clientData={clientData} key={index} />
              <Selected clientData={clientData} key={index} />
            </>
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
              <Switch {...label} disabled />
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
