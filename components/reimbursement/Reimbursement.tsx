import React from "react";
import CustomTable from "../table/CustomTable";
import { TableProductreimbursement } from "@/helpers/TableProductreimbursement";
import { TableDataProduct } from "@/helpers/TableDataProduct";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import Button from "../button/Button";
import { useEffect, useState, useCallback } from "react";
import {
  getAxle,
  getCodeNumber,
  getCylinder,
  getDegree,
  getListRescueVoucherPatients,
} from "@/services/voucher";
import CustomSelect from "../select/Select";
import {
  addRepayment,
  listPurchase,
  listReimbursementData,
} from "@/services/purchase";
import { toast } from "react-toastify";
import useDataStorage from "@/hooks/useDataStorage";
import "animate.css";
import { useRouter } from "next/router";

const Reimbursement = () => {
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
  const [purchaseList, setPurchaseList] = useState([]);
  const [reimbursementList, setReimbursementList] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const useData = useDataStorage();
  const router = useRouter();
  // const options = [{ value: "4", id: "4" }];
  const [isLoading, setIsLoading] = useState(false);
  const [hideTable, setHideTable] = useState(false);

  const handleClickReimbursement = () => {
    setHideTable(true);
  };

  const getVisitiData = useCallback(() => {
    setIsLoading(true);
    listPurchase()
      .then((response) => {
        setPurchaseList(response.value);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshTable, useData.refresh]);

  const getReimbursementData = useCallback(() => {
    setIsLoading(true);
    listReimbursementData()
      .then((response) => {
        setReimbursementList(response.value);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshTable, useData.refresh]);

  useEffect(() => {
    getVisitiData();
    getReimbursementData();
  }, [getVisitiData, getReimbursementData, refreshTable, useData.refresh]);

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

  const handleClick = () => {
    setIsLoading(true);
    const dataSelected = {
      ProgramCode: "073",
      Items: [
        {
          ProductId: selectedAxies,
          Amount: parseInt(optionsQuatity),
        },
      ],
    };
    setRefreshTable(false);
    addRepayment(dataSelected as any)
      .then((response) => {
        router.push("/dashboard/home");
        toast.success("Reembolso realizado com sucesso");
        setRefreshTable(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClearFields = () => {
    setSelectedCodeNumber("");
    setSelectedProduct("");
    setSelectedCylinder("");
    setSelectedAxies("");
    setOptionsQuatity("");
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

  const quantityOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    id: (i + 1).toString(),
  }));

  return (
    <div>
      <div className=" md:grid md:grid-cols-4 rounded-lg">
        <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
          <div className="border-careLightBlue border-r-[2px] text-careDarkBlue">
            <AiOutlineInfoCircle className="mr-3" size="2rem" />
          </div>
          <span className="pl-5 text-careDarkBlue">
            Aqui você pode realizar o processo de reembolso para os clientes,
            quando solicitado.
          </span>
        </div>
        <div className="mt-2 md:ml-10 mb-2 ">
          <Button
            onClick={handleClickReimbursement}
            customClass="md:w-60 bg-careBlue border-careBlue p-4 py-2"
            label="SOLICITAR REEMBOLSO"
          />
        </div>
      </div>
      {hideTable ? (
        <>
          <div className="flex flex-col md:flex md:flex-row gap-2 mt-10 mb-5 fade-in">
            <div className="md:w-96 w-[21.5rem]">
              <span className="text-3xl text-careLightBlue">
                Extrato total:
              </span>
              <div className="mt-3">
                <CustomTable
                  isLoading={isLoading}
                  rowId="productName"
                  rows={purchaseList}
                  columns={TableProductreimbursement.columns}
                />
              </div>
            </div>
            <div className="md:w-[63.55%] w-[21.5rem]">
              <span className="text-3xl text-careLightBlue">
                Confirmação de Reembolso
              </span>
              <div className="mt-3">
                <CustomTable
                  isLoading={isLoading}
                  rowId="voucher"
                  rows={reimbursementList}
                  columns={TableDataProduct.columns}
                />
              </div>
            </div>
          </div>
          <div>
            {inputBlocks.map((block, index) => (
              <div
                key={block.id}
                className="bg-careGrey rounded-xl mt-5 mb-5 p-5 fade-in"
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
                      options={quantityOptions}
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
          </div>
          <div className="mt-5 md:flex md:flex-row mb-5 flex flex-col items-center justify-end">
            <Button
              onClick={handleClearFields}
              label="Limpar"
              customClass="bg-white border-careDarkBlue text-careDarkBlue h-12 md:w-40 w-full text-sm mr-2 mt-2"
            />
            <Button
              onClick={handleClick}
              label="Enviar"
              customClass="bg-careGreen border-careGreen h-12 md:w-40 w-full text-sm mr-2 mt-2"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Reimbursement;
