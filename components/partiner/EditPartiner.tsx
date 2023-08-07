import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import CustomSelect from "../select/Select";
import Button from "../button/Button";
import { BiUser } from "react-icons/bi";
import {
  MdOutlineApartment,
  MdOutlineLocationOn,
  MdOutlineLock,
} from "react-icons/md";
import { FaEye, FaEyeSlash, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import InputMask from "react-input-mask";
import {
  listPartiner,
  deletePartiner,
  updatePartiner,
} from "@/services/partiner";
import useEditPartiner from "@/hooks/useEditPartiner";
import useDataStoragePartiner from "@/hooks/useDataStoragePartiner";

const EditPartiner = () => {
  const dataStoragePartiner = useDataStoragePartiner();
  const editPartiner = useEditPartiner();
  const [editMode, setEditMode] = useState(false);
  const [updatedPartiner, setUpdatedPartiner] = useState({
    name: dataStoragePartiner.partnerData.name,
    telephone1: dataStoragePartiner.partnerData.telephone,
    mobilePhone: dataStoragePartiner.partnerData.mobilePhone,
    emailAddress: dataStoragePartiner.partnerData.emailAddress,
    emailAddress2: dataStoragePartiner.partnerData.emailAddress2,
    addressPostalCode: dataStoragePartiner.partnerData.addressPostalCode,
    addressName: dataStoragePartiner.partnerData.addressName,
    addressNumber: dataStoragePartiner.partnerData.addressNumber,
    addressComplement: dataStoragePartiner.partnerData.addressComplement,
    addressDistrict: dataStoragePartiner.partnerData.addressDistrict,
    addressCity: dataStoragePartiner.partnerData.addressCity,
    addressState: dataStoragePartiner.partnerData.addressState,
    addressCountry: dataStoragePartiner.partnerData.addressCountry,
    cnpj: dataStoragePartiner.partnerData.cnpj,
    mainContact: dataStoragePartiner.partnerData.mainContact,
    password: dataStoragePartiner.partnerData.password,
    accountTypeStringMapFlag:
      dataStoragePartiner.partnerData.accountTypeStringMapFlag,
    ProgramCode: "073",
  });

  const handleDeletePartiner = () => {
    const friendlyCode = dataStoragePartiner.partnerData.friendlyCode;
    const programCodeToDelete = "073";

    deletePartiner(friendlyCode, programCodeToDelete)
      .then((res) => {
        toast.success("Parceiro deletado com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Erro ao deletar parceiro!");
        console.log(err);
      });
  };

  const handleUpdatePartiner = () => {
    updatePartiner(updatedPartiner)
      .then((res) => {
        toast.success("Parceiro atualizado com sucesso!");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Erro ao atualizar parceiro!");
        console.log(err);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedPartiner({ ...updatedPartiner, [name]: value });
  };

  const editClick = () => {
    setEditMode(!editMode);
  };

  const maskedCNPJ = () => {
    return (
      <InputMask
        disabled
        value={updatedPartiner.cnpj}
        onChange={handleChange}
        mask="99.999.999/9999-99"
        maskChar={null}
      >
        <Input placeholder="CNPJ" startIcon iconStart={FaRegAddressCard} />
      </InputMask>
    );
  };

  const maskedPhone = () => {
    return (
      <InputMask
        disabled={!editMode}
        name="telephone1"
        value={updatedPartiner.telephone1}
        onChange={handleChange}
        mask="(99) 99999-9999"
        maskChar={null}
      >
        <Input
          placeholder="(DDD) XXXX-XXXX"
          startIcon
          iconStart={BsTelephone}
        />
      </InputMask>
    );
  };

  const maskedMobilePhone = () => {
    return (
      <InputMask
        disabled={!editMode}
        name="mobilePhone"
        value={updatedPartiner.mobilePhone}
        onChange={handleChange}
        mask="(99) 99999-9999"
        maskChar={null}
      >
        <Input
          placeholder="(DDD) XXXX-XXXX"
          startIcon
          iconStart={BsTelephone}
        />
      </InputMask>
    );
  };

  return (
    <div className="w-full fill-careBlue fade-in">
      <div className="md:grid md:grid-cols-1">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <div>
          <span className="text-2xl text-careLightBlue">
            Adicionar um parceiro
          </span>
          <div className="sm:grid grid-cols-1 md:grid md:grid-cols-3 gap-6 mt-5">
            <div>
              <span className="text-careLightBlue">Nome</span>
              <Input
                disabled={!editMode}
                maxLength={50}
                name="mainContact"
                value={updatedPartiner.mainContact}
                onChange={handleChange}
                startIcon
                iconStart={BiUser}
                placeholder="Digite o nome"
              />
            </div>
            <div>
              <span className="text-careLightBlue">Razão Social</span>
              <Input
                name="name"
                value={updatedPartiner.name}
                disabled
                startIcon
                iconStart={MdOutlineApartment}
                placeholder="Regra"
              />
            </div>
            <div>
              <span className="text-careLightBlue">CNPJ</span>
              {maskedCNPJ()}
            </div>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 gap-8">
        <div className="mt-2">
          <div className="sm:grid grid-caols-1 mb-8 md:mb-0 md:grid grid-cols-3 gap-6">
            <div>
              <span className="text-careLightBlue">Tipo</span>
              <CustomSelect
                disabled={!editMode}
                name="accountTypeStringMapFlag"
                value={updatedPartiner.accountTypeStringMapFlag}
                onChange={handleChange}
                startIcon
                iconStart={FaEye}
                fullWidth
                placeholder="Especifique"
                options={[
                  {
                    id: "#CLINIC",
                    value: "(ECP) Clínicas",
                  },
                  {
                    id: "#POS",
                    value: "PDV (Óticas)",
                  },
                ]}
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">CEP</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressPostalCode"
                value={updatedPartiner.addressPostalCode}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite o endereço, número e CEP"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Estado</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressState"
                value={updatedPartiner.addressState}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite seu estado"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Cidade</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressCity"
                value={updatedPartiner.addressCity}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite sua cidade"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Bairro</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressDistrict"
                value={updatedPartiner.addressDistrict}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite seu bairro"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Pais</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressCountry"
                value={updatedPartiner.addressCountry}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite seu país"
              />
            </div>
            <div className="col-span-1 ">
              <span className="text-careLightBlue">Endereço</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressName"
                value={updatedPartiner.addressName}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite o endereço"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Número</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressNumber"
                value={updatedPartiner.addressNumber}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Digite seu número"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Complemento</span>
              <Input
                disabled={!editMode}
                maxLength={160}
                name="addressComplement"
                value={updatedPartiner.addressComplement}
                onChange={handleChange}
                startIcon
                iconStart={MdOutlineLocationOn}
                placeholder="Complemento"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 gap-8 ">
        <div className="mt-2">
          <div className="sm:grid grid-cols-1 md:grid md:grid-cols-3 gap-6">
            <div>
              <span className="text-careLightBlue">Telefone de contato</span>
              {maskedPhone()}
            </div>
            <div>
              <span className="text-careLightBlue">
                Telefone celular para contato
              </span>
              {maskedMobilePhone()}
            </div>
            <div>
              <span className="text-careLightBlue">Registre um E-mail</span>
              <Input
                disabled
                name="emailAddress"
                value={updatedPartiner.emailAddress}
                onChange={handleChange}
                startIcon
                iconStart={AiOutlineMail}
                placeholder="emailusuario@mail.com"
              />
            </div>
            <div>
              <span className="text-careLightBlue">
                E-mail corporativo do parceiro
              </span>
              <Input
                disabled
                name="emailAddress2"
                value={updatedPartiner.emailAddress2}
                onChange={handleChange}
                startIcon
                iconStart={AiOutlineMail}
                placeholder="emailusuario@mail.com"
              />
            </div>
            <div className="text-careLightBlue">
              <span>Registre uma senha</span>
              <Input
                name="password"
                value={updatedPartiner.password}
                onChange={handleChange}
                disabled
                startIcon
                iconStart={AiOutlineLock}
                placeholder="No minimo 8 dígitos"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 md:flex md:justify-end mt-2 md:mt-10 mb-2 gap-4 ">
        <Button
          onClick={editPartiner.onClose}
          customClass=" border-none text-blue-500 underline p-4 py-2 mt-2 "
          label="Voltar"
        />
        <Button
          onClick={handleDeletePartiner}
          customClass="text-careBlue p-4 py-3 "
          label="Cancelar Parceiro"
        />
        <Button
          onClick={editClick}
          customClass=" bg-careOrange border-careOrange p-4 py-3 px-10"
          label="Editar"
        />
        <Button
          onClick={handleUpdatePartiner}
          customClass=" bg-careLightBlue border-careLightBlue p-4 py-3 px-10"
          label="Salvar"
        />
      </div>
    </div>
  );
};

export default EditPartiner;