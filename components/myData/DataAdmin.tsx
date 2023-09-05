import React, { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import InputMask from "react-input-mask";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Button from "@/components/button/Button";
import useLogin from "@/hooks/useLogin";
import { editAdminData, getAdmData } from "@/services/login";
import { toast } from "react-toastify";
const label = { inputProps: { "aria-label": "Switch demo" } };
import dayjs from "dayjs";

const DataAdmin = () => {
  const auth = useLogin();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const [userDataAdm, setUserDataAdm] = useState({
    userName: "",
    userEmail: "",
    userBirthdate: "",
    userCPF: "",
    userMobilephone: "",
    userPassword: "",
    programCode: "073",
  });

  useEffect(() => {
    handleGetAdmData();
  }, []);

  const editDataAdmin = () => {
    setIsLoading(true);
    editAdminData(userDataAdm)
      .then(() => {
        toast.success("Dados alterados com sucesso");
      })
      .catch(() => {
        toast.error("Erro ao alterar dados");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGetAdmData = async () => {
    setIsLoading(true);
    getAdmData()
      .then((res) => {
        setIsLoading(false);
        setUserDataAdm((prevData) => ({
          ...prevData,
          userName: res.userName,
          userEmail: res.userEmail,
          userBirthdate: dayjs(res.userBirthdate).format("YYYY-MM-DD"),
          userCPF: res.userCPF,
          userMobilephone: res.userMobilephone,
          userPassword: res.userPassword,
        }));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDataAdm((prevData) => ({
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
        onChange={handleChange}
        name="userMobilephone"
        value={userDataAdm.userMobilephone}
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
        onChange={handleChange}
        name="userCPF"
        value={userDataAdm.userCPF}
        disabled={!isEditing}
        mask="999.999.999-99"
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
    <div className="bg-careGrey rounded-2xl p-8 fill-careBlue fade-in">
      <div className="flex flex-col">
        <span className="text-neutral-400">Nome</span>
        <Input
          onChange={handleChange}
          name="userName"
          value={userDataAdm.userName}
          placeholder="Seu nome"
          fullWidth
          startIcon
          imageSrc="/user-user.png"
          disabled={!isEditing}
        />
      </div>
      <div className="my-5 md:grid md:grid-cols-2 gap-8 md:my-5">
        <div className="flex flex-col">
          <span className="text-neutral-400">Email</span>
          <Input
            onChange={handleChange}
            name="userEmail"
            value={userDataAdm.userEmail}
            placeholder="Email"
            required
            startIcon
            imageSrc="/communication-mail.png"
            disabled={!isEditing}
          />
        </div>
        <div className="my-5 md:my-0">
          <span className="text-neutral-400">Data de nascimento</span>
          <Input
            name="userBirthdate"
            value={userDataAdm.userBirthdate}
            disabled={!isEditing}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder="Data de nascimento"
            startIcon
            imageSrc="/calendar-data.png"
            onChange={handleChange}
            type={hasValue || focus ? "date" : "text"}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 gap-8 md:my-5">
        <div>
          <span className="text-neutral-400">Telefone</span>
          {maskedPhoneNumber()}
        </div>
        <div className="my-5 md:my-0">
          <span className="text-neutral-400">CPF</span>
          {maskedCpf()}
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 gap-8 my-5 fill-careBlue">
        <div>
          <span className="text-neutral-400">Senha</span>
          <Input
            name="userPassword"
            value={userDataAdm.userPassword}
            disabled={!isEditing}
            placeholder="Senha"
            startIcon
            className=""
            imageSrc="/house-lock.png"
            endIcon
            type="password"
            onChange={handleChange}
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
            onChange={handleChange}
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
          onClick={editDataAdmin}
        />
      </div>
    </div>
  );
};

export default DataAdmin;
