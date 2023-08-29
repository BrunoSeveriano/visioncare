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
import { is } from "date-fns/locale";

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

const SearchModalEcp: React.FC<SearchModalProps> = ({
  clientData,
  selectedStatus,
}) => {
  const [clientVouchers, setClientVouchers] = useState<Voucher[]>([]);
  const [productOptions, setProductOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [cylinderOptions, setCylinderOptions] = useState([]);
  const [axiesOptions, setAxiesOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCylinder, setSelectedCylinder] = useState("");
  const [selectedAxies, setSelectedAxies] = useState("");
  const [selectedCodeNumber, setSelectedCodeNumber] = useState("");
  const [optionsQuatity, setOptionsQuatity] = useState("");
  const [inputBlocks, setInputBlocks] = useState([{ id: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
  const showHistoryPacient = useTalkModal();
  const useData = useDataStorage();
  const openProduct = useOpen();
  const options = [{ value: "4", id: "4" }];

  useEffect(() => {
    if (clientData && clientData.cpf) {
      setIsLoading(true);
      getListRescueVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          setClientVouchers(data);
        })
        .catch((error) => {
          error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [clientData, useData.refresh]);

  useEffect(() => {
    getCodeNumber()
      .then((response) => {
        const codeNumberOptions = response.value.map((item: any) => ({
          value: item.value,
          id: item.label,
        }));
        setProductOptions(codeNumberOptions);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (selectedCodeNumber) {
      getDegree(selectedCodeNumber)
        .then((response) => {
          const degreeOptions = response.value.map((item: any) => ({
            value: item.value,
            id: item.label,
          }));

          setDegreeOptions(degreeOptions);
        })
        .catch((error) => {});
    }
  }, [selectedCodeNumber]);

  useEffect(() => {
    if (selectedCodeNumber && selectedProduct) {
      getCylinder(selectedCodeNumber, selectedProduct)
        .then((response) => {
          const cylinderOptions = response.value.map((item: any) => ({
            value: item.value,
            id: item.label,
          }));

          setCylinderOptions(cylinderOptions);
        })
        .catch((error) => {});
    }
  }, [selectedCodeNumber, selectedProduct]);

  useEffect(() => {
    if (selectedCodeNumber && selectedProduct && selectedCylinder) {
      getAxle(selectedCodeNumber, selectedProduct, selectedCylinder)
        .then((response) => {
          const axiesOptions = response.value.map((item: any) => ({
            value: item.label,
            id: item.value,
          }));

          setAxiesOptions(axiesOptions);
        })
        .catch((error) => {});
    }
  }, [selectedCodeNumber, selectedProduct, selectedCylinder]);

  const handleSendProduct = () => {
    const statusVoucher = {
      programCode: "073",
      voucherId: useData.idVoucher,
    };

    const sendProduct = {
      ProgramCode: "073",
      Items: [
        {
          ProductId: selectedAxies,
          Amount: 4,
        },
      ],
    };
    useVoucher(statusVoucher)
      .then(() => {
        return addPurchase(sendProduct as any);
      })
      .then((response) => {
        handleClearFields();
        toast.success("Voucher e Produto resgatado enviado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao enviar voucher e produto resgatado!");
      });
  };

  function getFilteredVouchers(vouchers: Voucher[], status: string) {
    if (!status) {
      return vouchers;
    }

    return vouchers.filter((voucher) => voucher.status === status);
  }

  const handleCloseHistory = () => {
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

  const handleClearFields = () => {
    setSelectedCodeNumber("");
    setSelectedProduct("");
    setSelectedCylinder("");
    setSelectedAxies("");
    setOptionsQuatity("");
    openProduct.onClose();
    handleCloseHistory();
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
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <div className=" flex flex-row md:flex md:flex-col fade-in">
            <div className="rounded-l-xl w-40 pl-5 grid grid-cols-1 md:w-full bg-careLightGreen md:flex md:justify-around items-center md:rounded-t-xl pt-4 pb-4 text-xl text-white  ">
              <span>Cliente</span>
              <span>CPF</span>
              <span className="mr-5">Ações</span>
            </div>
            <div className="rounded-r-xl p-2 grid grid-cols-1 w-full bg-careOffWhite md:flex md:justify-around items-center pt-3 pb-3 md:rounded-b-xl text-md text-careDarkBlue ">
              <span className="border-b-2 pt-1 md:ml-5 pb-2 md:border-none">
                {clientData.name}
              </span>
              <span className="border-b-2 pt-1 pb-2 md:border-none">
                {clientData.cpf}
              </span>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={showHistoryPacient.onOpen}
                  disableHover
                  label="Ver mais"
                  customClass="bg-careDarkBlue border-careDarkBlue p-9 py-1 mr-1"
                />
              </div>
            </div>
          </div>
          {showHistoryPacient.isOpen ? (
            <div className="mt-7 md:flex md:flex-row gap-5 fade-in">
              <div className="md:w-full w-[22rem]">
                <CustomTable
                  isLoading={isLoading}
                  rowId="id"
                  rows={getFilteredVouchers(
                    clientData.vouchers,
                    selectedStatus
                  )}
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
            <div
              key={block.id}
              className="bg-careGrey rounded-xl mt-5 p-5 fade-in"
            >
              <div className="flex flex-col md:flex md:flex-row mt-3 gap-2">
                <div className="md:w-80 w-80 text-careDarkBlue font-bold">
                  <span>Produto Vendido</span>
                  <CustomSelect
                    options={productOptions}
                    value={selectedCodeNumber}
                    onChange={(e) => setSelectedCodeNumber(e.target.value)}
                    startIcon
                    fullWidth
                    name=""
                    placeholder="Selecione o tipo de produto"
                  />
                </div>

                <div className="md:w-40 w-80 text-careDarkBlue font-bold">
                  <span>Dioptria</span>
                  <CustomSelect
                    options={degreeOptions}
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    startIcon
                    fullWidth
                    name=""
                    placeholder="Selecione o tipo de produto"
                  />
                </div>
                <div className="md:w-40 w-80 text-careDarkBlue font-bold">
                  <span>Cilíndrico</span>
                  <CustomSelect
                    options={cylinderOptions}
                    value={selectedCylinder}
                    onChange={(e) => setSelectedCylinder(e.target.value)}
                    startIcon
                    fullWidth
                    name=""
                    placeholder="Selecione o tipo de produto"
                  />
                </div>
                <div className="md:w-40 w-80 text-careDarkBlue font-bold">
                  <span>Eixo</span>
                  <CustomSelect
                    options={axiesOptions}
                    value={selectedAxies}
                    onChange={(e) => {
                      setSelectedAxies(e.target.value);
                    }}
                    startIcon
                    fullWidth
                    name=""
                    placeholder="Selecione o tipo de produto"
                  />
                </div>
                <div className="md:w-40 w-80 text-careDarkBlue font-bold">
                  <span>Quantidade</span>
                  <CustomSelect
                    options={options}
                    value={optionsQuatity}
                    onChange={(e) => {
                      setOptionsQuatity(e.target.value);
                    }}
                    startIcon
                    fullWidth
                    name=""
                    placeholder="Selecione o tipo de produto"
                  />
                </div>
                {inputBlocks.length < 4 ? (
                  <div
                    onClick={() => handleAddInputBlock(index)}
                    className="bg-careMenuGrey rounded-full p-4 h-5 w-5 relative md:top-11 md:left-3 cursor-pointer "
                  >
                    <span className="relative right-2 bottom-2">
                      <AiOutlinePlus className="text-white" />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center mt-4">
            <div className="border-careDarkPurple border-r-[2px] text-careDarkPurple">
              <AiOutlineInfoCircle className="mr-3" size="2rem" />
            </div>
            <span className="pl-5 text-careDarkBlue">
              Caso necessário, você poderá gerar um pedido de compra.
            </span>
            <div className="md:ml-64 flex items-center">
              <Switch {...label} defaultChecked />
              <span className="text-careDarkBlue font-bold">
                Gerar pedido de compra
              </span>
            </div>
          </div>
          <div className="mt-5 md:flex md:flex-row flex flex-col items-center justify-end">
            <Button
              onClick={handleClearFields}
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
