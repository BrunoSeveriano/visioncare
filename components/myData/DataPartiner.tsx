import React, { useEffect, useState } from "react";
import useLogin from "@/hooks/useLogin";
import Input from "@/components/input/Input";
import InputMask from "react-input-mask";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Button from "@/components/button/Button";
import { toast } from "react-toastify";
import { listPartiner, updateDataPartiner } from "@/services/partiner";
import Loading from "../loading/Loading";

const DataPartiner = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userDataPartiner, setUserDataPartiner] = useState({
    mainContact: "",
    name: "",
    cnpj: "",
    mobilePhone: "",
    addressName: "",
    emailAddress: "",
    password: "",
    accountTypeStringMapFlag: "",
    ProgramCode: "073",
  });

  useEffect(() => {
    getPartinerData();
  }, []);

  const handleUpdatePartiner = () => {
    setIsLoading(true);
    updateDataPartiner(userDataPartiner)
      .then((res) => {
        getPartinerData();
        toast.success("Dados do Parceiro atualizado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao atualizar dados do parceiro!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getPartinerData = async () => {
    listPartiner()
      .then((res) => {
        setUserDataPartiner(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePartiner = (e: any) => {
    const { name, value } = e.target;
    setUserDataPartiner((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const maskedPhoneNumber = () => {
    return (
      <InputMask
        name="mobilePhone"
        onChange={handleChangePartiner}
        value={userDataPartiner.mobilePhone}
        mask="(99) 99999-9999"
        alwaysShowMask={false}
        maskPlaceholder={null}
        disabled={!isEditing}
      >
        <Input
          placeholder="Telefone"
          startIcon
          iconClass="scale-x-[-1]"
          imageSrc="/communication-call.png"
        />
      </InputMask>
    );
  };

  const maskedCpf = () => {
    return (
      <InputMask
        name="cnpj"
        onChange={handleChangePartiner}
        value={userDataPartiner.cnpj}
        required
        disabled={!isEditing}
        mask="99.999.999/9999-99"
        alwaysShowMask
        maskPlaceholder={null}
      >
        <Input placeholder="CPF" startIcon imageSrc="/education-teacher.png" />
      </InputMask>
    );
  };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#FFF",
      "&:hover": {
        backgroundColor: alpha("#017749", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#017749",
    },
  }));

  return (
    <div className="bg-careGrey rounded-2xl p-8 fill-careBlue">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="md:grid md:grid-cols-2 gap-8 md:my-5">
            <div className="flex flex-col">
              <span className="text-neutral-400">Nome</span>
              <Input
                name="mainContact"
                onChange={handleChangePartiner}
                value={userDataPartiner.mainContact}
                fullWidth
                startIcon
                imageSrc="/user-user.png"
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-400">Razão Social</span>
              <Input
                name="name"
                onChange={handleChangePartiner}
                value={userDataPartiner.name}
                fullWidth
                startIcon
                imageSrc="/health-hospital.png"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 gap-8 md:my-5">
            <div className="flex flex-col ">
              <span className="text-neutral-400">Meu CNPJ</span>
              {maskedCpf()}
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-400">Telefone</span>
              {maskedPhoneNumber()}
            </div>
          </div>
          <div className="md:grid md:grid-cols-1 gap-8 md:my-5">
            <div>
              <span className="text-neutral-400">Endereço</span>
              <Input
                name="addressName"
                onChange={handleChangePartiner}
                value={userDataPartiner.addressName}
                fullWidth
                startIcon
                imageSrc="/navigation-maps.png"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 gap-8 md:my-5">
            <div>
              <span className="text-neutral-400">Meu E-mail cadastrado</span>
              <Input
                name="emailAddress"
                onChange={handleChangePartiner}
                value={userDataPartiner.emailAddress}
                fullWidth
                startIcon
                imageSrc="/communication-mail.png"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 gap-8 my-5 fill-careBlue">
            <div>
              <span className="text-neutral-400">Senha</span>
              <Input
                name="password"
                value={userDataPartiner.password}
                disabled={!isEditing}
                placeholder="Senha"
                startIcon
                imageSrc="/house-lock.png"
                endIcon
                type="password"
                onChange={handleChangePartiner}
              />
            </div>
            <div className="my-5 md:my-0">
              <span className="text-neutral-400">Confirmar senha</span>
              <Input
                name="confirmedPassword"
                disabled={!isEditing}
                placeholder="Confirmar senha"
                startIcon
                imageSrc="/house-lock.png"
                endIcon
                type="password"
              />
            </div>
          </div>
          <div className="flex w-full items-center">
            <GreenSwitch {...label} defaultChecked />
            <span className="ml-2 text-neutral-400">
              Aceito receber comunicações e contatos nos canais informados.
            </span>
          </div>
          <div className="flex justify-start mt-20">
            <Button
              customClass="bg-careDarkBlue border-careDarkBlue py-2 w-40"
              label="Editar"
              onClick={handleEditClick}
            />
            <Button
              customClass="bg-careLightBlue border-careLightBlue py-2 w-40 ml-2"
              label="Salvar"
              disabled={!isEditing}
              onClick={handleUpdatePartiner}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DataPartiner;
