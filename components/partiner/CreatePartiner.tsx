import React from "react";
import { useState } from "react";
import Input from "../input/Input";
import CustomSelect from "../select/Select";
import Button from "../button/Button";
import { addPartiner } from "@/services/partiner";
import { ToastContainer, toast } from "react-toastify";
import InputMask from "react-input-mask";
import useRegisterPartiner from "@/hooks/useRegisterPartiner";
import { getAddressByCep } from "@/services/cep";
import useDataStorage from "@/hooks/useDataStorage";

const CreatePartiner = ({ refreshTable }: { refreshTable: () => void }) => {
  const partiner = useRegisterPartiner();
  const dataScheduling = useDataStorage();
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [registerPartiner, setRegisterPartiner] = useState({
    accountTypeStringMapFlag: "",
    name: "",
    telephone1: "",
    mobilePhone: "",
    emailAddress: "",
    emailAddress2: "",
    addressPostalCode: "",
    addressName: "",
    addressNumber: "",
    addressComplement: "",
    addressDistrict: "",
    addressCity: "",
    addressState: "",
    addressCountry: "",
    cnpj: "",
    mainContact: "",
    password: "",
    ProgramCode: "073",
    sapCode: "",
  });

  const handleRegisterPartiner = () => {
    addPartiner(registerPartiner)
      .then((res) => {
        toast.success("Parceiro cadastrado com sucesso!");
        dataScheduling.setRefresh(!dataScheduling.refresh);
        partiner.onClose();
        refreshTable();
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar parceiro!");
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterPartiner({ ...registerPartiner, [name]: value });
  };

  const handleAddress = () => {
    setIsLoadingAddress(true);
    getAddressByCep(registerPartiner.addressPostalCode)
      .then((res) => {
        setRegisterPartiner({
          ...registerPartiner,
          addressName: res.street,
          addressDistrict: res.neighborhood,
          addressCity: res.city,
          addressState: res.state,
          addressCountry: "Brasil",
        });
      })
      .catch((err) => {
        setIsLoadingAddress(false);
      });
  };

  const maskedCNPJ = () => {
    return (
      <InputMask
        name="cnpj"
        onChange={handleChange}
        mask="99.999.999/9999-99"
        maskChar={null}
      >
        <Input
          placeholder="000.000.000-00"
          startIcon
          imageSrc="/education-teacher.png"
        />
      </InputMask>
    );
  };

  const maskedPhone = () => {
    return (
      <InputMask
        name="telephone1"
        onChange={handleChange}
        mask="(99) 9999-9999"
        maskChar={null}
      >
        <Input
          placeholder="(DDD) XXXX-XXXX"
          startIcon
          imageSrc="/communication-call.png"
        />
      </InputMask>
    );
  };

  const maskedCep = () => {
    return (
      <InputMask
        name="addressPostalCode"
        onChange={handleChange}
        mask="99999-999"
        maskChar={null}
        onBlur={handleAddress}
      >
        <Input
          maxLength={160}
          placeholder="Digite seu CEP"
          startIcon
          imageSrc="/navigation-maps.png"
        />
      </InputMask>
    );
  };

  const maskedMobilePhone = () => {
    return (
      <InputMask
        name="mobilePhone"
        onChange={handleChange}
        mask="(99) 99999-9999"
        maskChar={null}
      >
        <Input
          placeholder="(DDD) XXXX-XXXX"
          startIcon
          imageSrc="/communication-call.png"
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
                maxLength={50}
                name="mainContact"
                onChange={handleChange}
                startIcon
                imageSrc="/user-user.png"
                placeholder="Nome do usuário responsável"
              />
            </div>
            <div>
              <span className="text-careLightBlue">Razão Social</span>
              <Input
                maxLength={50}
                name="name"
                onChange={handleChange}
                startIcon
                imageSrc="/health-hospital.png"
                placeholder="Nome da empresa"
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
              <span className="text-careLightBlue">Forneça o Código SAP</span>
              <Input
                maxLength={20}
                name="sapCode"
                onChange={handleChange}
                startIcon
                imageSrc="/icon-sap.png"
                placeholder="O Parceiro deverá estar cadastrado"
              />
            </div>
            <div>
              <span className="text-careLightBlue">Tipo</span>
              <CustomSelect
                value={registerPartiner.accountTypeStringMapFlag}
                startIcon
                imageSrc="/eyes-icon.png"
                fullWidth
                name="accountTypeStringMapFlag"
                onChange={handleChange}
                placeholder="Especifique"
                options={[
                  {
                    id: "#Clinic",
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
              {maskedCep()}
            </div>

            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Estado</span>
              <Input
                value={registerPartiner.addressState}
                maxLength={160}
                name="addressState"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
                placeholder="Digite seu estado"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Cidade</span>
              <Input
                value={registerPartiner.addressCity}
                maxLength={160}
                name="addressCity"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
                placeholder="Digite sua cidade"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Bairro</span>
              <Input
                value={registerPartiner.addressDistrict}
                maxLength={160}
                name="addressDistrict"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
                placeholder="Digite seu bairro"
              />
            </div>
            <div className="col-span-1 ">
              <span className="text-careLightBlue">Endereço</span>
              <Input
                value={registerPartiner.addressName}
                maxLength={160}
                name="addressName"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
                placeholder="Digite o endereço"
              />
            </div>

            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Número</span>
              <Input
                maxLength={160}
                name="addressNumber"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
                placeholder="Digite seu número"
              />
            </div>
            <div className="md:grid md:grid-cols-1">
              <span className="text-careLightBlue">Complemento</span>
              <Input
                maxLength={160}
                name="addressComplement"
                onChange={handleChange}
                startIcon
                imageSrc="/navigation-maps.png"
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
                maxLength={100}
                name="emailAddress"
                onChange={handleChange}
                startIcon
                imageSrc="/communication-mail.png"
                placeholder="emailusuario@mail.com"
              />
            </div>
            <div>
              <span className="text-careLightBlue">
                E-mail corporativo do parceiro
              </span>
              <Input
                maxLength={100}
                name="emailAddress2"
                onChange={handleChange}
                startIcon
                imageSrc="/communication-mail.png"
                placeholder="emailusuario@mail.com"
              />
            </div>
            <div>
              <span className="text-careLightBlue">Registre uma senha</span>
              <Input
                maxLength={20}
                name="password"
                onChange={handleChange}
                startIcon
                imageSrc="/house-lock.png"
                placeholder="No minimo 8 dígitos"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 md:flex md:justify-end mt-2 md:mt-10 mb-2 ">
        <Button
          onClick={partiner.onClose}
          customClass=" border-none text-blue-500 underline p-4 py-2 mt-2 "
          label="Voltar"
        />
        <Button
          onClick={handleRegisterPartiner}
          customClass=" bg-careLightBlue border-careLightBlue p-4 py-3 px-10"
          label="Adicionar"
        />
      </div>
    </div>
  );
};

export default CreatePartiner;
