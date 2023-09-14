import {
  getAxle,
  getCodeNumber,
  getCylinder,
  getDegree,
  getListRescueVoucherPatients,
} from "@/services/voucher";
import CustomSelect from "../select/Select";
import React, { useEffect, useState } from "react";
import useDataStorage from "@/hooks/useDataStorage";

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
}

const Selected = ({ clientData }: SearchModalProps) => {
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
  const options = [{ value: "4", id: "4" }];
  const dataStorage = useDataStorage();

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

  return (
    <div>
      <div className="bg-careGrey rounded-xl mt-5 p-5 fade-in">
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
              onBlur={() => {
                dataStorage.setAxiesId({
                  ...dataStorage.AxiesId.Items,
                  productId: selectedAxies,
                });
              }}
              startIcon
              fullWidth
              name=""
              placeholder="Selecione o tipo de produto"
            />
          </div>
          {/* {inputBlocks.length < 4 ? (
            <div className="bg-careMenuGrey rounded-full p-4 h-5 w-5 relative md:top-11 md:left-3 cursor-pointer ">
              <span                
                className="relative right-2 bottom-2"
              >
                <AiOutlinePlus className="text-white" />
              </span>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default Selected;
