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
import {
  editAdminData,
  editClientData,
  getAdmData,
  getClientData,
} from "@/services/login";
import Loading from "@/components/loading/Loading";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { homeMenuPacient } from "@/constants/homeMenuPacient";
import { homeMenuAdmin } from "@/constants/homeMenuAdmin";
import { useRouter } from "next/router";
import useDataStorage from "@/hooks/useDataStorage";
import HuggyChat from "../specialist/HuggyChat";

import { homeMenuPdv } from "@/constants/homeMenuPdv";
import { homeMenuEcp } from "@/constants/homeMenuEcp";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const onBoardModal = useOnboardModal();
  const auth = useLogin();
  const router = useRouter();
  const dataStorage = useDataStorage();

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
  const [isEcpUser, setIsEcpUser] = useState(false);
  const [isPdvUser, setIsPdvUser] = useState(false);
  const [userNameEcp, setUserNameEcp] = useState("");
  const [userNamePdv, setUserNamePdv] = useState("");
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

  const [editData, setEditData] = useState({
    User: {
      Email: userData.patientEmail,
      Password: userData.patientUserPassword,
    },
    name: userData.namePatient,
    confirmedPassword: userData.patientUserPassword,
    birthdate: userData.patientBirthDate,
    mobilephone: userData.patientMobilephone,
    cpf: userData.cpf,
    programCode: "073",
  });

  const [editDataAdm, setEditDataAdm] = useState({
    userName: userDataAdm.userName,
    userEmail: userDataAdm.userEmail,
    userBirthdate: userDataAdm.userBirthdate,
    userMobilephone: userDataAdm.userMobilephone,
    userCPF: userDataAdm.userCPF,
    userPassword: userDataAdm.userPassword,
    programCode: "073",
  });

  useEffect(() => {
    if (!auth.isLogged) {
      router.push("/login");
    }

    const userRoleEcp = auth.role === "Partner ECP VisionCare";
    if (userRoleEcp) {
      setIsEcpUser(true);
    }

    const userRolePdv = auth.role === "Partner POS VisionCare";
    if (userRolePdv) {
      setIsPdvUser(true);
    }

    const nameEcp = auth.name;
    if (nameEcp) {
      setUserNameEcp(nameEcp);
    }

    const namePdv = auth.name;
    if (namePdv) {
      setUserNamePdv(namePdv);
    }

    const userEmail = localStorage.getItem("email") || "";
    userEmail.includes("its.jnj.com") ? setIsAdminUser(true) : null;

    // if (localStorage.getItem("finalized") !== "true") {
    //   onBoardModal.onOpen();
    // }

    setNavbarSpanText("Início");
  }, []);

  useEffect(() => {
    if (isAdminUser) {
      handleGetAdmData();
    }
    if (!isAdminUser) {
      handleGetUserData();
    }
  }, [isAdminUser]);

  const menuOptions = homeMenuPacient.map((option) => {
    return {
      ...option,
      active: router.pathname.includes(option.route),
    };
  });

  const adminOptions = homeMenuAdmin.map((option) => {
    return {
      ...option,
      active: router.pathname.includes(option.route),
    };
  });

  const EcpOptions = homeMenuEcp.map((option) => {
    return {
      ...option,
      active: router.pathname.includes(option.route),
    };
  });

  const PdvOptions = homeMenuPdv.map((option) => {
    return {
      ...option,
      active: router.pathname.includes(option.route),
    };
  });

  const handleNameChange = (text: string) => {
    setNavbarSpanText(text);
  };

  const handleEditData = () => {
    setIsLoading(true);
    if (isAdminUser) {
      return editAdminData(editDataAdm)
        .then(() => {
          console.log("editDataAdm", editDataAdm);
          handleGetAdmData();
          toast.success("Dados Adiministrador alterados com sucesso");
        })
        .catch(() => {
          toast.error("Erro ao alterar dados");
        })
        .finally(() => {
          handleGetAdmData();
          setIsLoading(false);
        });
    }
    if (!isAdminUser) {
      return editClientData(editData)
        .then(() => {
          handleGetUserData();
          toast.success("Dados alterados com sucesso");
        })
        .catch(() => {
          toast.error("Erro ao alterar dados");
        })
        .finally(() => {
          handleGetUserData();
          setIsLoading(false);
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (isAdminUser) {
      setEditDataAdm((prevData) => ({ ...prevData, [name]: value }));
      setUserDataAdm((prevData) => ({ ...prevData, [name]: value }));
    }
    if (!isAdminUser) {
      e.target.name === "patientEmail"
        ? setEditData({
            ...editData,
            User: { ...editData.User, Email: e.target.value },
          })
        : null;
      e.target.name === "patientUserPassword"
        ? setEditData({
            ...editData,
            User: { ...editData.User, Password: e.target.value },
          })
        : null;
      setEditData((prevData) => ({ ...prevData, [name]: value }));
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleGetUserData = () => {
    setIsLoading(true);
    getClientData()
      .then((res) => {
        setIsLoading(false);
        res.data.map((data: any) => {
          setUserData((prevData) => ({
            ...prevData,
            namePatient: data.namePatient,
            patientBirthDate: dayjs(data.patientBirthDate).format("DD/MM/YYYY"),
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
          userBirthdate: dayjs(res.userBirthdate).format("DD/MM/YYYY"),
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
    // setEditData({
    //   ...editData,
    //   User: {
    //     Email: userData.patientEmail,
    //     Password: userData.patientUserPassword,
    //   },
    //   name: userData.namePatient,
    //   confirmedPassword: userData.patientUserPassword,
    //   birthdate: userData.patientBirthDate,
    //   mobilephone: userData.patientMobilephone,
    //   cpf: userData.cpf,
    // });
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
        name={isAdminUser ? "userMobilephone" : "patientMobilephone"}
        value={
          isAdminUser
            ? userDataAdm.userMobilephone
            : userData.patientMobilephone
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
        name={isAdminUser ? "userCPF" : "cpf"}
        value={isAdminUser ? userDataAdm.userCPF : userData.cpf}
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
      <HuggyChat />
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
        className={`w-1/3 hidden md:flex border-r-[0.5px] h-screen flex-col border-careGrey ${sidebarClasses}`}
      >
        <div className="mt-12 flex justify-center">
          <div
            className={`flex gap-2 h-16 xl:px-7 2xl:px-16 border-b-2 border-careLightBlue md:mb-6 2xl:mb-5`}
            style={imageStyle}
          >
            <Image
              src="/acuvue.png"
              width={60}
              height={60}
              className={`object-contain ${
                sideBarOpen ? "relative bottom-1 " : "relative bottom-4"
              } `}
              alt="acuvue"
            />
            <Image
              src="/my-acuvue-dashboard.png"
              width={160}
              height={500}
              className={`object-contain ${
                sideBarOpen ? "block left-10" : "hidden"
              } `}
              alt="acuvue"
            />
          </div>
        </div>
        <div className="flex flex-col md:px-3 lg:px-3 xl:px-7 2xl:px-14 w-">
          <div className="border-b-2 ">
            {(() => {
              if (isAdminUser) {
                return adminOptions.map((option, i) => (
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
                    image
                    path={option.path}
                    onNameChange={handleNameChange}
                  />
                ));
              } else if (isEcpUser) {
                return EcpOptions.map((option, i) => (
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
                    image
                    path={option.path}
                    onNameChange={handleNameChange}
                  />
                ));
              } else if (isPdvUser) {
                return PdvOptions.map((option, i) => (
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
                    image
                    path={option.path}
                    onNameChange={handleNameChange}
                  />
                ));
              } else {
                return menuOptions.map((option, i) => (
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
                    image
                    path={option.path}
                    onNameChange={handleNameChange}
                  />
                ));
              }
            })()}
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
                Olá,{" "}
                {isAdminUser
                  ? userDataAdm.userName
                  : isEcpUser
                  ? userNameEcp
                  : isPdvUser
                  ? userNamePdv
                  : userData.namePatient}
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
                <div className="border-careDarkBlue border-[1px] rounded-lg p-3 flex items-center">
                  <div className="bg-careDarkBlue rounded-full mr-4 p-2">
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
                      name={isAdminUser ? "userName" : "namePatient"}
                      value={
                        isAdminUser
                          ? userDataAdm.userName
                          : userData.namePatient
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
                        name={isAdminUser ? "userEmail" : "patientEmail"}
                        value={
                          isAdminUser
                            ? userDataAdm.userEmail
                            : userData.patientEmail
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
                        name={
                          isAdminUser ? "userBirthdate" : "patientBirthDate"
                        }
                        value={
                          isAdminUser
                            ? userDataAdm.userBirthdate
                            : userData.patientBirthDate
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
                        name={
                          isAdminUser ? "userPassword" : "patientUserPassword"
                        }
                        value={
                          isAdminUser
                            ? userDataAdm.userPassword
                            : userData.patientUserPassword
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
                      customClass="bg-careLightBlue border-careLightBlue py-2 w-40 ml-2"
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
          <div className="flex md:hidden bg-white h-full gap-3 ">
            <div className="flex flex-col gap-3 ml-14 mt-10 w-72">
              {(() => {
                if (isAdminUser) {
                  return adminOptions.map((option, i) => (
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
                      image
                      path={option.path}
                      onNameChange={handleNameChange}
                    />
                  ));
                } else if (isEcpUser) {
                  return EcpOptions.map((option, i) => (
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
                      image
                      path={option.path}
                      onNameChange={handleNameChange}
                    />
                  ));
                } else if (isPdvUser) {
                  return PdvOptions.map((option, i) => (
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
                      image
                      path={option.path}
                      onNameChange={handleNameChange}
                    />
                  ));
                } else {
                  return menuOptions.map((option, i) => (
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
                      image
                      path={option.path}
                      onNameChange={handleNameChange}
                    />
                  ));
                }
              })()}
            </div>
          </div>
        )}
      </div>
      {showRightSidebar && (
        <>
          {router.pathname !== "/dashboard/patient-voucher" ? (
            <div
              className={`w-1/3 hidden md:flex border-r-[0.5px] h-screen flex-col border-careGrey ${sidebarRightClasses}`}
            >
              <div className="w-full mt-5">
                <div
                  onClick={handleOpenMyData}
                  className=" pl-5 pr-5 border-b-[1px] pb-2 lg:pb-[27px] cursor-pointer"
                >
                  <div className="border-careDarkBlue border-[1px] rounded-lg p-3 flex items-center">
                    <div className="bg-careDarkBlue rounded-full mr-4 p-2">
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
          ) : (
            <div className="hidden md:block mt-5 md:w-1/3  md:right-0 bg-white">
              <div className="py-[30px] px-5 border-b-2 border-gray-200 flex flex-col">
                <span className="text-2xl text-careLightBlue">
                  Histórico de utilização
                </span>
              </div>
              <div className="mb-5 py-5 px-5 border-b-2 border-gray-200 flex flex-col">
                <span className="text-lg- text-careBlue">DATA / LOCAL</span>
              </div>
              <div className="w-[23rem]">
                <div className="md:ml-4 mb-5">
                  {dataStorage.VoucherUserHistory.utilizedHistory &&
                    dataStorage.VoucherUserHistory.utilizedHistory.length > 0 &&
                    dataStorage.VoucherUserHistory.utilizedHistory.map(
                      (historyItem: any, index: any) => (
                        <>
                          <div
                            key={index}
                            className="border border-careGrey bg-careGrey p-5 rounded-t-xl"
                          >
                            <div className="text-careLightBlue">
                              {dayjs(historyItem.useDate).format("DD/MM/YYYY")}
                            </div>
                            <div className="text-careBlue mt-1">
                              <span className="font-bold text-lg">
                                {historyItem.discountType} -
                              </span>
                              <span> {historyItem.locality}</span>
                            </div>
                          </div>
                          <div className="flex justify-end rounded-b-xl mb-3 text-careLightBlue bg-careBlue text-lg p-3 ">
                            {historyItem.discountType}
                          </div>
                        </>
                      )
                    )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
