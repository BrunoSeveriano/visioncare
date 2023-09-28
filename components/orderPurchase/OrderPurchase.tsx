import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Input from "../input/Input";
import CustomSelect from "../select/Select";
import CustomTable from "../table/CustomTable";
import { TableMockupOrderPurchase } from "@/helpers/TableMockupOrderPurchase";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { listPartinerAdmin } from "@/services/partiner";
import useDataStorage from "@/hooks/useDataStorage";
import ExportToTxtAll from "../button/ExportToTxtAll";

const OrderPurchase = () => {
  const dataScheduling = useDataStorage();
  const [clientTable, setClientTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [partnerQuery, setPartnerQuery] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    handleClientTable();
  }, [dataScheduling.refresh, startDate, status, partnerQuery, type]);

  const handleClientTable = () => {
    setIsLoading(true);
    listPartinerAdmin()
      .then((res) => {
        let filteredData = res.value;

        if (startDate) {
          filteredData = filteredData.filter((item: any) => {
            return item.solicitationDate.includes(
              startDate.toLocaleLowerCase()
            );
          });
        }

        if (status !== null && status !== "") {
          filteredData = filteredData.filter((item: any) => {
            return item.isConfirmed === status;
          });
        }

        if (partnerQuery) {
          filteredData = filteredData.filter((item: any) => {
            return (
              item.partnerName
                .toLowerCase()
                .includes(partnerQuery.toLowerCase()) ||
              item.partnerCnpj
                .toLowerCase()
                .includes(partnerQuery.toLowerCase()) ||
              item.id.toLowerCase().includes(partnerQuery.toLowerCase())
            );
          });
        }

        if (type) {
          filteredData = filteredData.filter((item: any) => {
            return item.type === type;
          });
        }
        filteredData.sort((a: any, b: any) => {
          const dateA = new Date(a.solicitationDate);
          const dateB = new Date(b.solicitationDate);
          return dateB.getTime() - dateA.getTime();
        });

        setClientTable(filteredData);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClear = () => {
    setStartDate("");
    setStatus("");
    setPartnerQuery("");
    setType("");
  };

  const handleOpenTable = () => {
    setOpenTable(!openTable);
  };

  return (
    <div className="fade-in mb-5">
      <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
        <div className="border-careDarkBlue border-r-[2px] text-careDarkBlue">
          <AiOutlineInfoCircle className="mr-3" size="2rem" />
        </div>
        <span className="pl-5 text-careDarkBlue">
          Administre os Pedidos de Compra solicitados pelos Parceiros J&J
        </span>
      </div>
      <div className="w-full mt-10 md:grid md:grid-cols-4 flex flex-col gap-5">
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">Localizar Por:</span>
          <Input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            placeholder="Período"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">Localizar Status:</span>
          <CustomSelect
            options={[
              { id: true, value: "Confirmado" },
              { id: false, value: "Não Confirmado" },
            ]}
            name="status"
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            fullWidth
            placeholder="Selecionar Status"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">
            Localizar por Parceiros:
          </span>
          <Input
            imageSrc="/search-icon.png"
            startIcon
            placeholder="Buscar por Nome / CNPJ / ID"
            value={partnerQuery}
            onChange={(e) => setPartnerQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">
            Localizar por Tipo:
          </span>
          <CustomSelect
            options={[
              { id: "#SALES_ORDER", value: "Pedido de Compra" },
              { id: "#REPAYMENT", value: "Pedido de Reembolso" },
            ]}
            fullWidth
            placeholder="Selecione o tipo"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
      </div>
      <div className="lg:flex lg:flex-row lg:justify-end md:flex md:flex-row md:justify-end flex flex-col gap-4 md:mt-20 mt-10">
        <div>
          <Button
            customClass="w-full border-careBlue text-careBlue p-10 py-2"
            label="Limpar"
            onClick={handleClear}
          />
        </div>
        <div>
          <Button
            onClick={handleOpenTable}
            customClass="w-full bg-careGreen border-careGreen p-10 py-2"
            label="Iniciar"
          />
        </div>
      </div>
      {openTable && (
        <>
          <div className="mt-14 lg:w-full md:w-full w-[22rem] fade-in">
            <CustomTable
              isLoading={isLoading}
              rowId="id"
              rows={clientTable}
              columns={TableMockupOrderPurchase.columns}
            />
          </div>
          <div className="md:flex md:justify-end lg:flex lg:justify-end flex justify-center mt-5 mb-10 gap-2 fade-in">
            <div>
              <ExportToTxtAll
                label="Baixar Todos"
                className="w-full bg-careDarkBlue border-careDarkBlue p-10 py-2"
              />
            </div>
            <div className="p-1 rounded-lg bg-careGrey">
              <BsThreeDotsVertical
                size="1.7em"
                className="fill-careLightBlue cursor-pointer mt-1"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPurchase;
