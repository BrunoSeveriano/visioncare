import React, { useEffect, useState } from "react";
import useOnboardModal from "@/hooks/useOnboardModal";
import useLogin from "@/hooks/useLogin";
import Input from "@/components/input/Input";
import InputMask from "react-input-mask";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Button from "@/components/button/Button";
import {
  editAdminData,
  editClientData,
  getAdmData,
  getClientData,
} from "@/services/login";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useDataStorage from "@/hooks/useDataStorage";
import Loading from "../loading/Loading";

const DataPatient = () => {
  const auth = useLogin();
  const router = useRouter();
  const dataStorage = useDataStorage();

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [editData, setEditData] = useState({
    User: {
      Email: "",
      Password: "",
    },
    name: "",
    confirmedPassword: "",
    birthdate: "",
    mobilephone: "",
    cpf: "",
    programCode: "073",
  });

  useEffect(() => {
    handleGetUserData();
  }, []);

  const editDataPatient = () => {
    setIsLoading(true);
    editClientData(editData)
      .then(() => {
        toast.success("Dados alterados com sucesso");
      })
      .catch(() => {
        toast.error("Erro ao alterar dados");
      })
      .finally(() => {
        setIsEditing(false);
        setIsLoading(false);
      });
  };

  const handleGetUserData = () => {
    setIsLoading(true);
    getClientData()
      .then((res) => {
        setIsLoading(false);
        res.data.map((data: any) => {
          setEditData((prevData) => ({
            ...prevData,
            User: {
              Email: data.patientEmail,
              Password: data.patientUserPassword,
            },
            name: data.namePatient,
            confirmedPassword: data.patientUserPassword,
            birthdate: dayjs(data.patientBirthDate).format("YYYY-MM-DD"),
            mobilephone: data.patientMobilephone,
            cpf: data.cpf,
            programCode: "073",
          }));
        });
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "Email") {
      setEditData((prevData) => ({
        ...prevData,
        User: {
          ...prevData.User,
          Email: value,
        },
      }));
      return;
    }
    if (name === "Password") {
      setEditData((prevData) => ({
        ...prevData,
        User: {
          ...prevData.User,
          Password: value,
        },
      }));
      return;
    }
    setEditData((prevData) => ({
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
        name="mobilephone"
        value={editData.mobilephone}
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
        name="cpf"
        value={editData.cpf}
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-neutral-400">Nome</span>
            <Input
              onChange={handleChange}
              name="name"
              value={editData.name}
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
                name="Email"
                value={editData.User.Email}
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
                name="birthdate"
                value={editData.birthdate}
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
                name="Password"
                value={editData.User.Password}
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
              onClick={editDataPatient}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DataPatient;
