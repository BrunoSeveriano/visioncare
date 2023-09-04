import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Input from "../input/Input";
import CustomSelect from "../select/Select";
import CustomTable from "../table/CustomTable";
import { TableMockupOrderPurchase } from "@/helpers/TableMockupOrderPurchase";
import { BsThreeDotsVertical } from "react-icons/bs";

const OrderPurchase = () => {
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
          <Input type="date" placeholder="Período" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">Localizar Status:</span>
          <CustomSelect
            options={[
              { value: "Confirmado", label: "Confirmado" },
              { value: "Cancelado", label: "Cancelado" },
            ]}
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
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-careLightBlue">
            Localizar por Tipo:
          </span>
          <CustomSelect
            options={[
              { value: "Pedido de Compra", label: "Pedido de Compra" },
              { value: "Pedido de Reembolso", label: "Pedido de Reembolso" },
            ]}
            fullWidth
            placeholder="Selecione o tipo"
          />
        </div>
      </div>
      <div className="lg:flex lg:flex-row lg:justify-end md:flex md:flex-row md:justify-end flex flex-col gap-4 md:mt-20 mt-10">
        <div>
          <Button
            customClass="w-full border-careBlue text-careBlue p-10 py-2"
            label="Limpar"
          />
        </div>
        <div>
          <Button
            customClass="w-full bg-careGreen border-careGreen p-10 py-2"
            label="Iniciar"
          />
        </div>
      </div>
      <div className="mt-14 lg:w-full md:w-full w-[22rem]">
        <CustomTable
          rowId="id"
          rows={TableMockupOrderPurchase.rows}
          columns={TableMockupOrderPurchase.columns}
        />
      </div>
      <div className="md:flex md:justify-end lg:flex lg:justify-end flex justify-center mt-5 gap-2">
        <div>
          <Button
            customClass="w-full bg-careDarkBlue border-careBlue p-10 py-2"
            label="Baixar Todos"
          />
        </div>
        <div className="p-1 rounded-lg bg-careGrey">
          <BsThreeDotsVertical
            size="1.7em"
            className="fill-careLightBlue cursor-pointer mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPurchase;
