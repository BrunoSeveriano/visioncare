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
  totalQuantity: number;
}

const Selected = ({ clientData, totalQuantity }: SearchModalProps) => {
  const [productOptions, setProductOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [cylinderOptions, setCylinderOptions] = useState([]);
  const [axiesOptions, setAxiesOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCylinder, setSelectedCylinder] = useState("");
  const [selectedAxies, setSelectedAxies] = useState("");
  const [selectedCodeNumber, setSelectedCodeNumber] = useState("");
  const [optionsQuatity, setOptionsQuatity] = useState("");
  const [axiesObject, setAxiesObject] = useState<any[]>([]);
  const dataStorage = useDataStorage();

  const quantityValue =
    totalQuantity >= 4 ? 1 : 4 / Math.pow(2, totalQuantity - 1);

  useEffect(() => {
    dataStorage.setAxiesId(axiesObject);
  }, [axiesObject]);

  useEffect(() => {
    if (selectedAxies && optionsQuatity) {
      setAxiesObject([
        ...dataStorage.AxiesId,
        {
          productId: selectedAxies,
          amount: optionsQuatity,
        },
      ]);
    }
  }, [optionsQuatity, selectedAxies]);

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
    <div className="w-full">
      <div className="bg-careGrey rounded-xl mt-5 p-5 fade-in">
        <div className="flex flex-col md:flex md:flex-row mt-3 gap-2 w-full">
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
              options={[
                {
                  value: quantityValue.toString(),
                  id: quantityValue.toString(),
                },
              ]}
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
        </div>
      </div>
    </div>
  );
};

export default Selected;
