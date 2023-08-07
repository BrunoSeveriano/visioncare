import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { BsChatSquareDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { confirmationRegisterSmsToken } from "@/services/login";
import { toast } from "react-toastify";

const Confirmation = () => {
  const router = useRouter();

  const [registerSmsToken, setRegisterSmsToken] = useState({
    name: "TOKEN_CADASTRO",
    token: "",
    mobilePhone: "",
    programCode: "073",
  });

  const handleSmsToken = () => {
    confirmationRegisterSmsToken(registerSmsToken)
      .then(() => {
        toast.success("Cadastro confirmado com sucesso!");
        router.push("/dashboard/home");
      })
      .catch((error) => {
        toast.error("Código inválido!");
      });
  };

  useEffect(() => {
    const mobilephone = localStorage.getItem("mobilephone");

    if (mobilephone) {
      setRegisterSmsToken({ ...registerSmsToken, mobilePhone: mobilephone });
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterSmsToken({ ...registerSmsToken, [name]: value });
  };

  return (
    <div className="h-screen bg-careLightBlue">
      <div className="xl:block md:hidden">
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[23%] xl:bottom-[41%] bg-[#FFB81C]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[15%] xl:bottom-[33%] bg-[#A51890]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[7%]  xl:bottom-[25%] bg-[#FF6A39]"></div>
      </div>
      <div className="block md:hidden">
        <Image
          width={337}
          height={212}
          alt="background-mobile"
          src="/bg-confirmation.png"
          className="z-40 absolute top-[100px] left-8"
          quality={100}
        />
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Image
          width={630}
          height={520}
          className="absolute top-1/4 left-20"
          alt="background-tablet"
          src="/bg-confirmation.png"
          quality={100}
        />
      </div>
      <div className="hidden 2xl:block">
        <Image
          width={844}
          height={529}
          className="absolute top-1/4 left-48"
          alt="background"
          src="/bg-confirmation.png"
          quality={100}
        />
      </div>
      <div className="h-full flex flex-col justify-end md:justify-center md:items-end w-screen">
        <div className="z-50 p-8 2xl:p-10 mb-9 lg:mb-3 bg-white rounded-3xl max-h-[80%] mx-auto w-11/12 md:w-6/12 lg:w-4/12 2xl:w-[30%] 2xl:mr-28 xl:mr-24 md:mx-auto">
          <div className="flex w-full h-full flex-col">
            <div className="flex flex-col justify-start text-careLightBlue text-4xl mb-5">
              <span>Confirmacão</span>
              <span>de cadastro</span>
            </div>
            <div className="my-5 z-40 flex flex-col ">
              <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
                Enviamos um código por SMS para você.
              </span>
              <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
                Insira abaixo e confirme seu cadastro!
              </span>
            </div>
            <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-7 md:mb-0">
              <Input
                name="token"
                onChange={handleChange}
                className="fill-careBlue h-12 md:h-16"
                startIcon
                iconStart={BsChatSquareDots}
                fullWidth
                placeholder="Código enviado por SMS"
                type="email"
                autoComplete="off"
              />
            </div>
            <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
              <Button
                customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5"
                label="CONFIRMAR"
                onClick={handleSmsToken}
              />
              <Button
                customClass="bg-careBlue border-careBlue py-2 xl:py-5"
                label="VOLTAR"
                onClick={() => router.push("/")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
