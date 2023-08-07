import MenuOptions from "@/components/Menu/MenuOptions";
import Modal from "@/components/modals/Modal";
import ContentCard from "@/components/card/ContentCard";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoArrowBackCircleOutline,
  IoExitOutline,
  IoPersonOutline,
} from "react-icons/io5";
import React, { useEffect, useState } from "react";
import useOnboardModal from "@/hooks/useOnboardModal";
import useLogin from "@/hooks/useLogin";
import {
  MdCalendarMonth,
  MdClose,
  MdOutlineLock,
  MdOutlineMail,
  MdOutlinePerson,
} from "react-icons/md";
import Input from "@/components/input/Input";
import InputMask from "react-input-mask";
import { AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Button from "@/components/button/Button";
import { editClientData, getAdmData, getClientData } from "@/services/login";
import Loading from "@/components/loading/Loading";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { homeMenuPacient } from "@/constants/homeMenuPacient";
import { homeMenuAdmin } from "@/constants/homeMenuAdmin";
import { useRouter } from "next/router";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const onBoardModal = useOnboardModal();

  const auth = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLogged) {
      router.push("/login");
    }

    const userEmail = localStorage.getItem("email") || "";
    setIsAdminUser(userEmail.endsWith("@its.jnj.com"));

    // if (localStorage.getItem("finalized") !== "true") {
    //   onBoardModal.onOpen();
    // }
    setNavbarSpanText("Início");
    handleGetUserData();
    handleGetAdmData();
  }, []);

  const [sideBarOpen, setSidebarOpen] = useState(true);
  const [textHidden, setTextHidden] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [menuLeftMobile, setMenuLeftMobile] = useState(false);
  const [menuRightMobile, setMenuRightMobile] = useState(false);
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const sidebarClasses = sideBarOpen ? "" : "w-48 md:flex ";
  const sidebarRightClasses = sideBarOpen ? "" : "w-1/4 md:flex ";
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [showMyData, setShowMyData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardText, setDashboardText] = useState("");
  const [navbarSpanText, setNavbarSpanText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
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

  const menuOptions = homeMenuPacient.map((option) => {
    return {
      ...option,
      active: option.text === navbarSpanText,
    };
  });

  const adminOptions = homeMenuAdmin.map((option) => {
    return {
      ...option,
      active: option.text === navbarSpanText,
    };
  });

  const handleNameChange = (text: string) => {
    setNavbarSpanText(text);
  };

  const handleEditData = () => {
    setIsLoading(true);
    editClientData(editData)
      .then(() => {
        handleGetUserData();
        toast.success("Dados alterados com sucesso");
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao alterar dados");
        setIsLoading(false);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (e.target.name === "Email") {
      return setEditData({
        ...editData,
        User: { ...editData.User, Email: e.target.value },
      });
    }
    if (e.target.name === "Password") {
      return setEditData({
        ...editData,
        User: { ...editData.User, Password: e.target.value },
      });
    }

    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [userData, setUserData] = useState({
    namePatient: "",
    patientBirthDate: "",
    cpf: "",
    patientMobilephone: "",
    patientEmail: "",
    patientUserPassword: "",
  });

  const [userDataAdm, setUserDataAdm] = useState({
    userName: "",
    userEmail: "",
    userBirthdate: "",
    userCPF: "",
    userMobilephone: "",
    userPassword: "",
  });

  const handleGetUserData = () => {
    setIsLoading(true);
    getClientData()
      .then((res) => {
        setIsLoading(false);
        res.data.map((data: any) => {
          setUserData((prevData) => ({
            ...prevData,
            namePatient: data.namePatient,
            patientBirthDate: dayjs(data.patientBirthDate).format("YYYY-MM-DD"),
            cpf: data.cpf,
            patientMobilephone: data.patientMobilephone,
            patientEmail: data.patientEmail,
            patientUserPassword: data.patientUserPassword,
          }));
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleGetAdmData = () => {
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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      ...editData,
      User: {
        Email: userData.patientEmail,
        Password: userData.patientUserPassword,
      },
      name: userData.namePatient,
      confirmedPassword: userData.patientUserPassword,
      birthdate: userData.patientBirthDate,
      mobilephone: userData.patientMobilephone,
      cpf: userData.cpf,
    });
  };

  const handleOpenMyData = () => {
    setShowMyData(!showMyData);
    if (dashboardText === "Meus Dados") {
      setDashboardText("");
    } else {
      setDashboardText("Meus Dados");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sideBarOpen);
    setTextHidden(!textHidden);
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  const imageStyle = {
    width: sideBarOpen ? "" : "200px",
    height: sideBarOpen ? "" : "600px",
    marginTop: sideBarOpen ? "" : "0.1rem",
    paddingTop: sideBarOpen ? "" : "0.8rem",
  };

  const maskedPhoneNumber = () => {
    return (
      <InputMask
        onChange={handleChange}
        name="mobilephone"
        value={
          !isEditing
            ? isAdminUser
              ? userDataAdm.userMobilephone
              : userData.patientMobilephone
            : editData.mobilephone
        }
        mask="(99) 99999-9999"
        alwaysShowMask={false}
        maskPlaceholder={null}
        disabled={!isEditing}
      >
        <Input
          placeholder="Telefone"
          startIcon
          iconClass="scale-x-[-1]"
          iconStart={AiOutlinePhone}
        />
      </InputMask>
    );
  };

  const maskedCpf = () => {
    return (
      <InputMask
        onChange={handleChange}
        name="cpf"
        value={
          !isEditing
            ? isAdminUser
              ? userDataAdm.userCPF
              : userData.cpf
            : editData.cpf
        }
        disabled={!isEditing}
        mask="999.999.999-99"
        alwaysShowMask
        maskPlaceholder={null}
      >
        <Input placeholder="CPF" startIcon iconStart={FaRegAddressCard} />
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

  if (!auth.isLogged) return null;
  return (
    <div className="flex w-full h-screen fade-in lg:overflow-auto">
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
      <div
        className={`w-1/3 hidden w- md:flex border-r-[0.5px] h-screen flex-col border-careGrey ${sidebarClasses}`}
      >
        <div className="mt-12 flex justify-center">
          <div
            className={`h-16 xl:px-7 2xl:px-16 border-b-2 border-careDarkPurple md:mb-6 2xl:mb-10`}
            style={imageStyle}
          >
            <Image
              src="/acuvue-dashboard.png"
              width={160}
              height={500}
              className={`object-contain ${sideBarOpen ? "" : "mb-2"}`}
              alt="acuvue"
            />
          </div>
        </div>
        <div className="flex flex-col md:px-3 lg:px-3 xl:px-7 2xl:px-14 w-">
          <div className="border-b-2 ">
            {(isAdminUser ? adminOptions : menuOptions).map((option, i) => (
              <MenuOptions
                spanClassname={`${
                  option.active
                    ? "bg-careLightBlue w-full text-white"
                    : "text-careMenuGrey"
                } p-5 rounded-lg last:mb-6 ${
                  !sideBarOpen ? "flex items-center justify-center" : ""
                } `}
                iconClassname={`${!option.active && "text-careBlue"}`}
                key={i}
                text={textHidden ? "" : option.text}
                route={option.route || ""}
                icon={option.icon}
                onNameChange={handleNameChange}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-end h-full mb-10 hover:opacity-70 md:mt-10 lg:mt-0 md:ml-8 xl:ml-12 2xl:ml-20">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <IoArrowBackCircleOutline
              size="1.5em"
              className={`text-careBlue ${
                sideBarOpen ? "" : "transform rotate-180"
              }`}
            />
            <span className="text-careMenuGrey text-lg">
              {textHidden ? "" : "Recuar"}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full border-r-[1px]  h-full ">
        <div className="h-28 top-0 w-full bg-careLightBlue flex justify-between md:hidden">
          <div className="mx-8 mt-12">
            <Image
              src="/acuvue-letter.png"
              width={160}
              height={500}
              alt="acuvue"
            />
          </div>
          <div className="mx-10 mt-12">
            {!menuLeftMobile ? (
              <GiHamburgerMenu
                size="1.7em"
                onClick={() => {
                  setMenuLeftMobile(!menuLeftMobile);
                }}
                className="text-white"
              />
            ) : (
              <MdClose
                size="1.7em"
                onClick={() => {
                  setMenuLeftMobile(!menuLeftMobile);
                }}
                className="text-white"
              />
            )}
          </div>
        </div>
        <div className={` mt-5 ${menuLeftMobile ? "hidden" : ""}`}>
          <div className="border-b-[1px] py-3 px-6">
            <div className="flex justify-between items-center">
              <span className="text-careLightBlue text-3xl">
                Olá, {isAdminUser ? userDataAdm.userName : userData.namePatient}
              </span>
              <div className="hidden md:flex">
                {!showRightSidebar ? (
                  <BsThreeDotsVertical
                    size="1.7em"
                    className="fill-careLightBlue cursor-pointer mt-2"
                    onClick={toggleRightSidebar}
                  />
                ) : (
                  <MdClose
                    size="1.7em"
                    className="fill-careLightBlue cursor-pointer mt-2"
                    onClick={toggleRightSidebar}
                  />
                )}
              </div>
              <div className="flex md:hidden">
                {!menuRightMobile ? (
                  <BsThreeDotsVertical
                    size="1.7em"
                    className="fill-careLightBlue cursor-pointer mt-2"
                    onClick={() => setMenuRightMobile(!menuRightMobile)}
                  />
                ) : (
                  <MdClose
                    size="1.7em"
                    className="fill-careLightBlue cursor-pointer mt-2"
                    onClick={() => setMenuRightMobile(!menuRightMobile)}
                  />
                )}
              </div>
            </div>
            <div className="text-careMenuGrey ml-1 my-1">
              <span className="text-sm">
                {dashboardText ? dashboardText : navbarSpanText}
              </span>
            </div>
          </div>
          {menuRightMobile && (
            <div className=" block md:hidden h-full w-full mt-5">
              <div
                onClick={handleOpenMyData}
                className=" mt-8 pl-5 pr-5 border-b-[1px] pb-2 lg:pb-[27px]"
              >
                <div className="border-purple-500 border-[1px] rounded-lg p-3 flex items-center">
                  <div className="bg-carePurple rounded-full mr-4 p-2">
                    <IoPersonOutline size="1.5em" className=" text-white" />
                  </div>
                  <span className="text-lg mt-1">Meus Dados</span>
                </div>
              </div>
              <div className=" mt-5 md:mt-5 ml-5 mr-5 2xl:mt-10 text-careDarkBlue cursor-pointer bg-careBackgroundInput py-6 rounded-lg ">
                <MenuOptions
                  logout
                  icon={IoExitOutline}
                  text="Sair da Conta"
                  route="/"
                  iconClassname="text-careLightBlue"
                />
              </div>
            </div>
          )}
          {!menuRightMobile && !showMyData && (
            <div className="px-6 mt-5 md:mt-5 2xl:mt-5 grid gap-y-3">
              {children}
            </div>
          )}

          {showMyData && (
            <div className="w-full md:mt-5 lg:xl:mt-6 px-8 mt-5">
              {isLoading ? (
                <div className="h-full mt-10">
                  <Loading className="flex justify-center items-center " />
                </div>
              ) : (
                <div className="bg-careGrey rounded-2xl p-8 fill-careBlue">
                  <div className="flex flex-col">
                    <span className="text-neutral-400">Nome</span>
                    <Input
                      onChange={handleChange}
                      name="name"
                      value={
                        !isEditing
                          ? isAdminUser
                            ? userDataAdm.userName
                            : userData.namePatient
                          : editData.name
                      }
                      placeholder="Seu nome"
                      fullWidth
                      startIcon
                      iconStart={MdOutlinePerson}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="my-5 md:grid md:grid-cols-2 gap-8 md:my-5">
                    <div className="flex flex-col">
                      <span className="text-neutral-400">Email</span>
                      <Input
                        onChange={handleChange}
                        name="Email"
                        value={
                          !isEditing
                            ? isAdminUser
                              ? userDataAdm.userEmail
                              : userData.patientEmail
                            : editData.User.Email
                        }
                        placeholder="Email"
                        required
                        startIcon
                        iconStart={MdOutlineMail}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="my-5 md:my-0">
                      <span className="text-neutral-400">
                        Data de nascimento
                      </span>
                      <Input
                        name="birthdate"
                        value={
                          !isEditing
                            ? isAdminUser
                              ? userDataAdm.userBirthdate
                              : userData.patientBirthDate
                            : editData.birthdate
                        }
                        disabled={!isEditing}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        placeholder="Data de nascimento"
                        startIcon
                        iconStart={MdCalendarMonth}
                        onChange={(e) => {
                          handleChange(e);
                          if (e.target.value) setHasValue(true);
                          else setHasValue(false);
                        }}
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
                        value={
                          !isEditing
                            ? isAdminUser
                              ? userDataAdm.userPassword
                              : userData.patientUserPassword
                            : editData.User.Password
                        }
                        disabled={!isEditing}
                        placeholder="Senha"
                        startIcon
                        className=""
                        iconStart={MdOutlineLock}
                        endIcon
                        type="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-5 md:my-0">
                      <span className="text-neutral-400">Confirmar senha</span>
                      <Input
                        name="confirmedPassword"
                        value={
                          !isEditing
                            ? isAdminUser
                              ? userDataAdm.userPassword
                              : userData.patientUserPassword
                            : editData.confirmedPassword
                        }
                        disabled={!isEditing}
                        placeholder="Confirmar senha"
                        startIcon
                        iconStart={MdOutlineLock}
                        endIcon
                        type="password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center">
                    <GreenSwitch {...label} defaultChecked />
                    <span className="ml-2 text-neutral-400">
                      Aceito receber comunicações e contatos nos canais
                      informados.
                    </span>
                  </div>
                  <div className="flex justify-start mt-20">
                    <Button
                      customClass="bg-careDarkBlue border-careDarkBlue py-2 w-40"
                      label="Editar"
                      onClick={handleEditClick}
                    />
                    <Button
                      customClass="bg-careDarkBlue border-careDarkBlue py-2 w-40 ml-2"
                      label="Salvar"
                      disabled={!isEditing}
                      onClick={handleEditData}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {menuLeftMobile && (
          <div className="flex md:hidden bg-careDarkBlue h-full gap-3 ">
            <div className="flex flex-col gap-3 ml-14 mt-10 w-72">
              {(isAdminUser ? adminOptions : menuOptions).map((option, i) => (
                <MenuOptions
                  spanClassname={`${
                    option.active
                      ? "bg-careLightBlue w-full text-white"
                      : "text-careMenuGrey bg-white"
                  }  p-5 rounded-lg last:mb-7 `}
                  iconClassname={`${!option.active && "text-careBlue"}`}
                  key={i}
                  text={option.text}
                  route={option.route || ""}
                  icon={option.icon}
                  onNameChange={handleNameChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {showRightSidebar && (
        <div
          className={`w-1/3 hidden md:flex border-r-[0.5px] h-screen flex-col border-careGrey ${sidebarRightClasses}`}
        >
          <div className="w-full mt-5">
            <div
              onClick={handleOpenMyData}
              className=" pl-5 pr-5 border-b-[1px] pb-2 lg:pb-[27px] cursor-pointer"
            >
              <div className="border-purple-500 border-[1px] rounded-lg p-3 flex items-center">
                <div className="bg-carePurple rounded-full mr-4 p-2">
                  <IoPersonOutline size="1.5em" className=" text-white" />
                </div>
                <span className="text-lg mt-1">Meus Dados</span>
              </div>
            </div>
          </div>
          <div className="md:mt-5 ml-5 mr-5 2xl:mt-10 text-careDarkBlue cursor-pointer bg-careBackgroundInput py-6 rounded-lg ">
            <MenuOptions
              logout
              icon={IoExitOutline}
              text="Sair da Conta"
              route="/"
              iconClassname="text-careLightBlue"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
