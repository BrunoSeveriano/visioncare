import MenuOptions from "@/components/Menu/MenuOptions";
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
import { MdClose } from "react-icons/md";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { homeMenuPacient } from "@/constants/homeMenuPacient";
import { homeMenuAdmin } from "@/constants/homeMenuAdmin";
import { useRouter } from "next/router";
import useDataStorage from "@/hooks/useDataStorage";
import HuggyChat from "../specialist/HuggyChat";
import { homeMenuPdv } from "@/constants/homeMenuPdv";
import { homeMenuEcp } from "@/constants/homeMenuEcp";
import CalendarEcp from "../calendar/CalendarEcp";
import DataPatient from "../myData/DataPatient";
import DataPartiner from "../myData/DataPartiner";
import DataAdmin from "../myData/DataAdmin";

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
  const sidebarClasses = sideBarOpen ? "" : "w-48 md:flex ";
  const sidebarRightClasses = sideBarOpen ? "" : "w-1/4 md:flex ";
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [showMyData, setShowMyData] = useState(false);
  const [dashboardText, setDashboardText] = useState("");
  const [navbarSpanText, setNavbarSpanText] = useState("");
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isEcpUser, setIsEcpUser] = useState(false);
  const [isPdvUser, setIsPdvUser] = useState(false);
  const [isPatientUser, setIsPatientUser] = useState(false);

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

    const userRoleAdmin = auth.role === "Admin JeJ - VisionCare";
    if (userRoleAdmin) {
      setIsAdminUser(true);
    }

    const userPatient = auth.role === "Patient VisionCare";
    if (userPatient) {
      onBoardModal.onOpen();
      setIsPatientUser(true);
    }

    setNavbarSpanText("Início");
  }, []);

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

  if (!auth.isLogged) return null;
  return (
    <div className="flex w-full h-screen fade-in lg:overflow-auto">
      <div className="fade-in">
        <HuggyChat />
      </div>

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

          {sideBarOpen ? (
            <div className="hidden md:flex ml-5 gap-5 mt-10 cursor-pointer ">
              <div
                onClick={() => {
                  router.push("https://www.instagram.com/jnjbrasil/");
                }}
              >
                <Image
                  src="/icon-instagram.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div
                onClick={() => {
                  router.push("https://www.facebook.com/jnj/?locale=pt_BR");
                }}
              >
                <Image src="/icon-facebook.png" width={15} height={20} alt="" />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex md:flex-col ml-6 gap-7 mt-10 cursor-pointer">
              <div
                onClick={() => {
                  router.push("https://www.instagram.com/jnjbrasil/");
                }}
              >
                <Image
                  src="/icon-instagram.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div
                onClick={() => {
                  router.push("https://www.facebook.com/jnj/?locale=pt_BR");
                }}
              >
                <Image src="/icon-facebook.png" width={15} height={20} alt="" />
              </div>
            </div>
          )}
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
                Olá, {isEcpUser && auth.userData.name}
                {isPdvUser && auth.userData.name}
                {isPatientUser && auth.userDataPatient[0].namePatient}
                {isAdminUser && auth.userDataAdmin.userName}
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
            <div className="w-full md:mt-5 xl:mt-6 px-8 mt-5 fade-in">
              {isEcpUser || isPdvUser ? (
                <>
                  <DataPartiner />
                </>
              ) : (
                <>
                  {isAdminUser && <DataAdmin />}
                  {isPatientUser && <DataPatient />}
                </>
              )}
              {isEcpUser && <CalendarEcp />}
            </div>
          )}
        </div>
        {menuLeftMobile && (
          <div className="flex md:hidden bg-careDarkBlue h-full gap-3 ">
            <div className="flex flex-col gap-3 ml-14 mt-10 w-72">
              {(() => {
                if (isAdminUser) {
                  return adminOptions.map((option, i) => (
                    <MenuOptions
                      spanClassname={`${
                        option.active
                          ? "bg-careLightBlue w-full text-white"
                          : "bg-white w-full text-careMenuGrey"
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
                          : "bg-white w-full text-careMenuGrey"
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
                          : "bg-white w-full text-careMenuGrey"
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
                          : "bg-white w-full text-careMenuGrey"
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
